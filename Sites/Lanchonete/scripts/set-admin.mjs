#!/usr/bin/env node
/**
 * Gerenciar admins pelo terminal, usando o Firebase Admin SDK.
 *
 *   npm run admin:list
 *   npm run admin:add -- <UID>
 *   npm run admin:remove -- <UID>
 *
 * O Admin SDK ignora as regras do Firestore — é exatamente por isso que ele
 * consegue escrever na coleção `admins`, que o navegador não pode (essa é a
 * proteção contra alguém se promover a admin).
 *
 * Configuração única: baixe uma chave de serviço e salve na raiz do projeto como
 * `service-account.json` (ela está no .gitignore e nunca vai para o Git):
 *   Firebase Console -> engrenagem (Configurações do projeto) -> Contas de serviço
 *   -> Gerar nova chave privada
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFirebaseConfig, findServiceAccountKey, consoleUrl } from './lib/project-config.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Localiza a chave de serviço ────────────────────────────────────────────
const keyPath = findServiceAccountKey(ROOT);
const appProjectId = readFirebaseConfig(ROOT)?.projectId ?? null;

if (!keyPath) {
  console.error(`
❌ Chave de serviço não encontrada.

Como resolver (uma vez só):
  1. Abra ${consoleUrl(appProjectId, '/settings/serviceaccounts/adminsdk')}
  2. Clique em "Gerar nova chave privada" e confirme
  3. Salve o arquivo baixado na raiz deste projeto como:  service-account.json

O arquivo está no .gitignore — ele nunca será commitado.
`);
  process.exit(1);
}

// ── Firestore ──────────────────────────────────────────────────────────────
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'));
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
const adminsCollection = db.collection('admins');

if (appProjectId && serviceAccount.project_id && serviceAccount.project_id !== appProjectId) {
  console.warn(
    `⚠️  Atenção: esta chave é do projeto "${serviceAccount.project_id}", ` +
    `mas o app está configurado para "${appProjectId}" (veja src/firebase.js).`
  );
}

// ── Comandos ───────────────────────────────────────────────────────────────
const [command = 'list', uid] = process.argv.slice(2);

const listAdmins = async () => {
  const snapshot = await adminsCollection.get();

  if (snapshot.empty) {
    console.log('⚠️  Nenhum admin cadastrado — ninguém consegue abrir o Painel Admin.');
    console.log(`   Para liberar o seu: npm run admin:add -- <SEU_UID>`);
    return;
  }

  console.log(`${snapshot.size} admin(s) no projeto ${app.options.projectId}:\n`);
  snapshot.forEach((docSnap) => {
    console.log(`  admins/${docSnap.id}   ${JSON.stringify(docSnap.data())}`);
  });
};

const requireUid = (value) => {
  if (!value) {
    console.error('❌ Informe o UID. Ex.: npm run admin:add -- r940L2B5iWd0vr64I0HwV1pWPQT2');
    console.error('   (o UID aparece no banner de aviso do app, no console do navegador,');
    console.error('    ou em Authentication -> Users no Firebase Console)');
    process.exit(1);
  }
  return value.trim();
};

const addAdmin = async (id) => {
  const ref = adminsCollection.doc(id);

  if ((await ref.get()).exists) {
    console.log(`ℹ️  admins/${id} já existe — nada a fazer.`);
    return;
  }

  await ref.set({ role: 'owner', addedAt: FieldValue.serverTimestamp() });
  console.log(`✅ Admin criado: admins/${id}`);
  console.log('   Recarregue o app (F5) — o Painel Admin aparece na barra lateral.');
};

const removeAdmin = async (id) => {
  const ref = adminsCollection.doc(id);

  if (!(await ref.get()).exists) {
    console.log(`ℹ️  admins/${id} não existe — nada a fazer.`);
    return;
  }

  await ref.delete();
  console.log(`🗑️  Admin removido: admins/${id}`);
};

try {
  if (command === 'list') await listAdmins();
  else if (command === 'add') await addAdmin(requireUid(uid));
  else if (command === 'remove') await removeAdmin(requireUid(uid));
  else {
    console.error(`❌ Comando desconhecido: "${command}". Use: list | add | remove.`);
    process.exit(1);
  }
  process.exit(0);
} catch (err) {
  console.error(`❌ Falhou: ${err.message}`);
  process.exit(1);
}
