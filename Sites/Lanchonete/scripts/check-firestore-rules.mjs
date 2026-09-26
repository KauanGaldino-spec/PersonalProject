import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const rules = readFileSync('firestore.rules', 'utf8');
let failures = 0;
const check = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${label} -> ${JSON.stringify(actual)}${ok ? '' : ` (expected ${JSON.stringify(expected)})`}`);
};

// ── 1. Structure ────────────────────────────────────────────────────────────
const opens = (rules.match(/{/g) || []).length;
const closes = (rules.match(/}/g) || []).length;
check('braces balanced', opens === closes, true);
check("rules_version '2'", /rules_version\s*=\s*'2';/.test(rules), true);
check('default-deny catch-all present', /match \/\{document=\*\*\}/.test(rules), true);

// ── 2. Every collection the client touches must have a rule block ───────────
const collectJsx = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectJsx(full, out);
    else if (/\.(jsx|js)$/.test(entry)) out.push(readFileSync(full, 'utf8'));
  }
  return out;
};
const sources = collectJsx('src').join('\n');
const used = [...new Set([...sources.matchAll(/collection\(db,\s*'(\w+)'\)/g)].map((m) => m[1]))].sort();
const collectionDoc = [...sources.matchAll(/doc\(db,\s*'(\w+)'/g)].map((m) => m[1]);
const required = [...new Set([...used, ...collectionDoc])].sort();
console.log(`     collections used by the app: ${required.join(', ')}`);

required.forEach((name) => {
  check(`rules cover "${name}"`, new RegExp(`match /${name}/`).test(rules), true);
});

// ── 3. The two things that were previously exploitable ─────────────────────
// Extract a match block body. The block opener is the LAST `{` on the `match` line
// (the earlier ones belong to path placeholders like /users/{userId}).
const blockOf = (name) => {
  const start = rules.indexOf(`match /${name}/`);
  if (start === -1) return '';
  const lineEnd = rules.indexOf('\n', start);
  const line = rules.slice(start, lineEnd === -1 ? rules.length : lineEnd);
  const opener = start + line.lastIndexOf('{');
  let depth = 0;
  for (let i = opener; i < rules.length; i += 1) {
    if (rules[i] === '{') depth += 1;
    else if (rules[i] === '}') {
      depth -= 1;
      if (depth === 0) return rules.slice(opener + 1, i);
    }
  }
  return '';
};

const usersBlock = blockOf('users');
check('users: block extracted', usersBlock.length > 50, true);
check('users: updates limited to favorites + lastAddress', /onlyChanged\(\['favorites',\s*'lastAddress'\]\)/.test(usersBlock), true);
check('users: creates limited to favorites', /keys\(\)\.hasOnly\(\['favorites'\]\)/.test(usersBlock), true);
check('users: no client delete', /allow delete: if false;/.test(usersBlock), true);
check('users: cannot write isAdmin', /isAdmin/.test(usersBlock), false);

const adminsBlock = blockOf('admins');
check('admins: block extracted', adminsBlock.length > 20, true);
check('admins: client writes denied', /allow write: if false;/.test(adminsBlock), true);

// ── 4. Syntax smells ───────────────────────────────────────────────────────
// Strip comments, then split on ';'. A missing semicolon would leave two `allow`
// keywords in one statement.
const noComments = rules.replace(/\/\/.*$/gm, '');
const statements = noComments.split(';');
const merged = statements.filter((s) => (s.match(/\ballow\b/g) || []).length > 1);
check('no allow statement missing its ";"', merged.length, 0);
check('allow statements found', (noComments.match(/\ballow\b/g) || []).length > 12, true);

// single '=' used as comparison (e.g. `if request.auth.uid = uid()`)
const assignment = noComments.split('\n').filter((l) => /\bif\b/.test(l) && /[^=!<>+\-*/%]=[^=]/.test(l));
check('no "=" used as comparison inside conditions', assignment.length, 0);

// isAdmin() must never be true for a signed-out caller
check('isAdmin() guarded by isSignedIn()', /function isAdmin\(\)\s*\{\s*return isSignedIn\(\)/.test(rules), true);

// request.auth.uid may only be reached (a) via the uid() helper, which every caller
// guards with isSignedIn(), or (b) behind an explicit `request.auth != null` check.
const authUidReads = [...rules.matchAll(/request\.auth\.uid/g)];
check('request.auth.uid occurs exactly twice', authUidReads.length, 2);
check('one read is the guarded uid() helper', /return request\.auth\.uid;/.test(rules), true);
check('the other is null-guarded inline', /request\.auth != null && submittedId == request\.auth\.uid/.test(rules), true);

// Public write endpoints must pin a server timestamp (no backdating / junk)
['reservations', 'supportMessages', 'orders', 'reviews'].forEach((name) => {
  const block = blockOf(name);
  check(`${name}: create pins createdAt to request.time`, /createdAt == request\.time/.test(block), true);
});

// Absolutely everybody's favourites/orders must not leak across accounts
check('orders read scoped to owner or admin', /uid\(\) == resource\.data\.userId \|\| isAdmin\(\)/.test(blockOf('orders')), true);

// Delivery details are mandatory on order creation (checked by helper function)
check('orders: create requires delivery details', /hasDeliveryDetails\(request\.resource\.data\)/.test(blockOf('orders')), true);
check('hasDeliveryDetails validates the customer map', /function hasDeliveryDetails\(data\)[\s\S]*?data\.customer is map[\s\S]*?data\.customer\.phone is string/.test(rules), true);
check('hasDeliveryDetails validates the address map', /data\.address is map[\s\S]*?data\.address\.street\.size\(\) > 0[\s\S]*?data\.address\.city is string/.test(rules), true);

// ── 6. Field allow-lists must match what the client actually sends ─────────
// Some rules use keys().hasOnly([...]). If the app sends a field that is not on
// that list the write is rejected at runtime with a confusing
// "Missing or insufficient permissions" — so cross-check them here.
const objectKeysAfter = (source, braceIndex) => {
  let depth = 0;
  let end = braceIndex;
  for (let i = braceIndex; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    else if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }

  const parts = [];
  let nested = 0;
  let buffer = '';
  for (const char of source.slice(braceIndex + 1, end)) {
    if ('{(['.includes(char)) nested += 1;
    if ('})]'.includes(char)) nested -= 1;
    if (char === ',' && nested === 0) { parts.push(buffer); buffer = ''; } else buffer += char;
  }
  parts.push(buffer);

  return parts
    .map((part) => part.match(/^\s*([A-Za-z_$][\w$]*)\s*:/))
    .filter(Boolean)
    .map((match) => match[1]);
};

const clientWriteKeys = (collection) => {
  const keys = new Set();
  const patterns = [
    new RegExp(`addDoc\\(\\s*collection\\(db,\\s*'${collection}'\\)\\s*,\\s*\\{`, 'g'),
    new RegExp(`setDoc\\(\\s*doc\\(db,\\s*'${collection}'[^)]*\\)\\s*,\\s*\\{`, 'g'),
  ];

  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(sources)) !== null) {
      objectKeysAfter(sources, match.index + match[0].length - 1)
        .forEach((key) => keys.add(key));
    }
  });

  return [...keys].sort();
};

const rulesAllowList = (collection) => {
  const match = blockOf(collection).match(/keys\(\)\.hasOnly\(\s*\[([^\]]*)\]/);
  if (!match) return null;
  return match[1]
    .split(',')
    .map((part) => part.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
    .sort();
};

['reservations', 'supportMessages'].forEach((name) => {
  const client = clientWriteKeys(name);
  const allowed = rulesAllowList(name);

  check(`${name}: rules declare a field allow-list`, Boolean(allowed), true);
  if (!allowed) return;

  const rejected = client.filter((key) => !allowed.includes(key));
  check(
    `${name}: all ${client.length} fields the app sends are allowed (${client.join(', ')})`,
    rejected,
    []
  );
});

// ── 5. Client no longer writes the admin flag anywhere ─────────────────────
const isAdminWrites = [...sources.matchAll(/isAdmin:/g)].length;
check('no `isAdmin:` write left in the client', isAdminWrites, 0);
check('client reads admin from the admins collection', /doc\(db,\s*'admins'/.test(sources), true);

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
