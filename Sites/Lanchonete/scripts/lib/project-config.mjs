import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Reads the web config straight out of src/firebase.js, so every script follows
 * the app instead of duplicating the project id in several places.
 */
export const readFirebaseConfig = (root) => {
  const file = join(root, 'src', 'firebase.js');
  if (!existsSync(file)) return null;

  const source = readFileSync(file, 'utf8');
  const pick = (key) => {
    const match = source.match(new RegExp(`${key}\\s*:\\s*["']([^"']*)["']`));
    return match ? match[1] : null;
  };

  return {
    file,
    apiKey: pick('apiKey'),
    authDomain: pick('authDomain'),
    projectId: pick('projectId'),
    storageBucket: pick('storageBucket'),
    messagingSenderId: pick('messagingSenderId'),
    appId: pick('appId'),
  };
};

/** The project `firebase deploy` targets (`.firebaserc`). */
export const readFirebasercProject = (root) => {
  const file = join(root, '.firebaserc');
  if (!existsSync(file)) return { file, projectId: null, error: 'arquivo ausente' };

  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'));
    return { file, projectId: parsed?.projects?.default ?? null };
  } catch {
    return { file, projectId: null, error: 'JSON inválido' };
  }
};

/** Locates an Admin SDK service-account key, if one was downloaded. */
export const findServiceAccountKey = (root) => {
  if (process.env.SERVICE_ACCOUNT_KEY) return process.env.SERVICE_ACCOUNT_KEY;

  const candidates = readdirSync(root).filter(
    (file) =>
      /^(service-account|serviceAccount)[\w.-]*\.json$/.test(file) ||
      /firebase-adminsdk[\w.-]*\.json$/.test(file)
  );

  return candidates.length ? join(root, candidates[0]) : null;
};

export const consoleUrl = (projectId, path = '') =>
  projectId
    ? `https://console.firebase.google.com/project/${projectId}${path}`
    : 'https://console.firebase.google.com/';
