#!/usr/bin/env node
/**
 * Brand-colour audit for the white-label theme.
 *
 * Hard-coded brand hexes in component CSS/JSX do NOT follow the colour chosen in
 * Painel Admin -> Configurações. `var(--brand-color)` does.
 *
 * Usage:
 *   node scripts/replace-colors.cjs          # dry run: report only
 *   node scripts/replace-colors.cjs --write  # apply the replacements
 *
 * Deliberately SKIPPED (these DEFINE the colour and must stay literals):
 *   - `--brand-color: #FF6B2B` / `--brand-color-dark: ...` in index.css
 *   - `primaryColor: '#FF6B2B'` state defaults and input fallbacks in JS
 *     (a JS colour input cannot read a CSS variable)
 *
 * NOT handled here: the pale `#FFF0E6` tint. That needs its own
 * `--brand-color-soft` variable, so it is intentionally left untouched.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const MAP = [
  { from: /#ff6b2b/gi, to: 'var(--brand-color)' },
  { from: /#ff5a1a/gi, to: 'var(--brand-color-dark)' },
];

// Lines that *define* or merely *display* the brand colour instead of using it.
// placeholder="..." is example text shown to the admin, not a colour value.
const isDefinition = (line) =>
  /--brand-color(-dark)?\s*:/.test(line)
  || /primaryColor/.test(line)
  || /placeholder=/.test(line);

const shouldWrite = process.argv.includes('--write');
const report = [];
let totalUses = 0;

function scan(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let hits = 0;

  const next = lines.map((line) => {
    if (isDefinition(line)) return line;

    let updated = line;
    for (const { from, to } of MAP) {
      const matches = updated.match(from);
      if (matches) {
        hits += matches.length;
        updated = updated.replace(from, to);
      }
    }
    return updated;
  });

  if (hits === 0) return;

  totalUses += hits;
  report.push({ file: path.relative(ROOT, file), hits });

  if (shouldWrite) fs.writeFileSync(file, next.join('\n'), 'utf8');
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(jsx|js|css)$/.test(entry)) scan(full);
  }
}

walk(SRC);

if (totalUses === 0) {
  console.log('Nenhuma cor de marca fixa encontrada. Nada a fazer.');
  process.exit(0);
}

console.log(`${shouldWrite ? 'Aplicadas' : 'Encontradas'} ${totalUses} ocorrência(s) em ${report.length} arquivo(s):\n`);
report
  .sort((a, b) => b.hits - a.hits)
  .forEach(({ file, hits }) => console.log(`  ${String(hits).padStart(3)}  ${file}`));

if (!shouldWrite) {
  console.log('\nDry run — nada foi alterado. Rode com --write para aplicar.');
}
