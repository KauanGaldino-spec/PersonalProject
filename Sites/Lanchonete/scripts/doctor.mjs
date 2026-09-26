#!/usr/bin/env node
/**
 * Verifica a configuração do Firebase deste projeto e diz exatamente o que falta.
 *
 *   npm run doctor
 *
 * Ele confere o que dá para checar localmente: se a config está completa, se os
 * campos apontam para o MESMO projeto (config pela metade ou misturada é a causa
 * mais comum de "não funciona"), se o .firebaserc combina, e quais admins existem
 * (quando houver uma chave de serviço).
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  readFirebaseConfig, readFirebasercProject, findServiceAccountKey, consoleUrl,
} from './lib/project-config.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const problems = [];
const warnings = [];

const ok = (label) => console.log(`  OK    ${label}`);
const bad = (label) => { problems.push(label); console.log(`  ERRO  ${label}`); };
const warn = (label) => { warnings.push(label); console.log(`  AVISO ${label}`); };

console.log('\nTasteHouse - verificacao do Firebase\n');

// ── 1. Config do app ───────────────────────────────────────────────────────
const config = readFirebaseConfig(ROOT);

console.log('1) Config do app (src/firebase.js)');

if (!config) {
  bad('src/firebase.js nao encontrado');
} else {
  const REQUIRED = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];

  REQUIRED.forEach((field) => {
    if (!config[field]) {
      bad(`${field} esta vazio -> copie a config COMPLETA em Configuracoes do projeto > Seus apps > Configuracao do SDK`);
    } else if (field === 'apiKey') {
      ok(`apiKey ${config[field].slice(0, 8)}...`);
    } else {
      ok(`${field}: ${config[field]}`);
    }
  });

  // Coerencia entre os campos: pega config copiada pela metade ou de dois projetos.
  if (config.projectId && config.authDomain && config.authDomain !== `${config.projectId}.firebaseapp.com`) {
    bad(`authDomain (${config.authDomain}) nao corresponde ao projectId (${config.projectId}) - parece config de dois projetos diferentes`);
  }
  if (config.projectId && config.storageBucket && !config.storageBucket.startsWith(config.projectId)) {
    warn(`storageBucket (${config.storageBucket}) nao comeca com o projectId (${config.projectId})`);
  }
  if (config.messagingSenderId && config.appId && !config.appId.startsWith(`1:${config.messagingSenderId}:`)) {
    bad(`appId (${config.appId}) nao corresponde ao messagingSenderId (${config.messagingSenderId}) - a config parece ser de dois projetos diferentes`);
  }
  if (config.apiKey && !config.apiKey.startsWith('AIza')) {
    warn('apiKey nao comeca com "AIza" - confira se e mesmo uma chave web do Firebase');
  }
}

// ── 2. firebaserc (usado pelo `firebase deploy`) ───────────────────────────
console.log('\n2) Projeto do CLI (.firebaserc)');
const rc = readFirebasercProject(ROOT);

if (rc.error) {
  warn(`.firebaserc: ${rc.error}`);
} else if (config?.projectId && rc.projectId !== config.projectId) {
  bad(`.firebaserc aponta para "${rc.projectId}" mas o app usa "${config.projectId}" -> o deploy publicaria as regras no projeto errado`);
} else {
  ok(`.firebaserc: ${rc.projectId}`);
}

// ── 3. Chave de servico (opcional, para npm run admin:*) ───────────────────
console.log('\n3) Chave de servico (scripts admin:*)');
const keyPath = findServiceAccountKey(ROOT);
let keyProjectId = null;

if (!keyPath) {
  warn('nenhuma chave encontrada -> os comandos admin:* nao funcionam (baixe em Configuracoes do projeto > Contas de servico)');
} else {
  try {
    const key = JSON.parse(readFileSync(keyPath, 'utf8'));
    keyProjectId = key.project_id;

    if (config?.projectId && keyProjectId !== config.projectId) {
      bad(`a chave e do projeto "${keyProjectId}" mas o app usa "${config.projectId}"`);
    } else {
      ok(`chave do projeto "${keyProjectId}"`);
    }
  } catch {
    bad('a chave de servico nao e um JSON valido');
  }
}

// ── 4. Admins ──────────────────────────────────────────────────────────────
console.log('\n4) Admins (colecao `admins`)');

if (keyPath && keyProjectId && keyProjectId === config?.projectId) {
  try {
    const { initializeApp, cert, getApps } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');

    if (getApps().length === 0) {
      initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) });
    }

    const snapshot = await getFirestore().collection('admins').get();

    if (snapshot.empty) {
      bad('nenhum admin cadastrado -> ninguem consegue abrir o Painel Admin');
    } else {
      snapshot.forEach((doc) => {
        // Auto-IDs do Console tem ~20 chars misturando letras e numeros.
        const looksAutoId = doc.id.length >= 18 && /[A-Za-z]/.test(doc.id) && /[0-9]/.test(doc.id);

        if (looksAutoId) {
          warn(`admins/${doc.id}  <- parece um Auto-ID, nao um UID de usuario`);
        } else {
          ok(`admins/${doc.id}`);
        }
      });
    }
  } catch (err) {
    bad(`nao consegui ler a colecao admins: ${err.message}`);
  }
} else {
  console.log('  (pulado: precisa da chave de servico do mesmo projeto)');
}

// ── 5. O que nao da para verificar daqui ───────────────────────────────────
console.log('\n5) Confira tambem no Firebase Console (nao da para checar localmente)');

if (config?.projectId) {
  console.log(`  - Firestore Database criado          ${consoleUrl(config.projectId, '/firestore')}`);
  console.log(`  - Authentication (E-mail/senha + Google) ativado`);
  console.log(`                                        ${consoleUrl(config.projectId, '/authentication/providers')}`);
  console.log('  - firestore.rules publicado          npm run check:rules');
}

// ── Resumo ─────────────────────────────────────────────────────────────────
console.log(`\n${'-'.repeat(64)}`);

if (problems.length === 0 && warnings.length === 0) {
  console.log('Tudo certo na configuracao local.');
} else {
  if (problems.length) {
    console.log(`${problems.length} problema(s) que impedem o funcionamento:`);
    problems.forEach((item) => console.log(`  - ${item}`));
  }
  if (warnings.length) {
    console.log(`${warnings.length} aviso(s):`);
    warnings.forEach((item) => console.log(`  - ${item}`));
  }
}

console.log(`${'-'.repeat(64)}\n`);
process.exit(problems.length ? 1 : 0);
