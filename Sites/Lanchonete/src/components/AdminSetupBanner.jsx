import React, { useState } from 'react';
import { AlertTriangle, Copy, Check, X, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { app } from '../firebase';

/**
 * Setup aid: shown when a signed-in account *should* be an admin but has no
 * document in the `admins` collection yet (after the security migration) or when
 * the page is opened with `?admin-setup`.
 *
 * It only ever reveals the visitor's OWN uid, so there is nothing to leak here.
 */
export default function AdminSetupBanner({ uid, onRetry, onDismiss }) {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null); // null | 'not-found' | 'found'

  const projectId = app.options.projectId;
  const consoleUrl = projectId
    ? `https://console.firebase.google.com/project/${projectId}/firestore`
    : 'https://console.firebase.google.com/';

  const handleCopy = () => {
    navigator.clipboard
      .writeText(uid)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  const handleRetry = async () => {
    if (!onRetry || checking) return;
    setChecking(true);
    setResult(null);

    const found = await onRetry();

    setChecking(false);
    setResult(found ? 'found' : 'not-found');

    // Show the confirmation briefly, then close (the sidebar button is back).
    if (found) setTimeout(() => onDismiss?.(), 2200);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:flex-row sm:items-start">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />

        <div className="flex-1 text-sm text-amber-900">
          <p className="font-bold">Painel Admin indisponível neste login</p>
          <p className="mt-1">
            O acesso administrativo agora vem da coleção{' '}
            <code className="rounded bg-amber-100 px-1 font-mono text-xs">admins</code> do Firestore
            (não mais do campo <code className="rounded bg-amber-100 px-1 font-mono text-xs">isAdmin</code>{' '}
            em <code className="rounded bg-amber-100 px-1 font-mono text-xs">users</code>).
          </p>

          <p className="mt-2 font-semibold">
            O app procurou exatamente este documento e não encontrou:
          </p>
          <div className="mt-1 rounded-lg bg-white px-3 py-2 font-mono text-xs ring-1 ring-amber-200">
            <div className="text-amber-700">projeto: {projectId}</div>
            <div className="break-all">
              admins/<strong>{uid}</strong>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-amber-700"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copiado' : 'Copiar ID'}
            </button>
            <button
              onClick={handleRetry}
              disabled={checking}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-amber-900 ring-1 ring-amber-300 transition hover:bg-amber-100 disabled:opacity-60"
            >
              {checking ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              {checking ? 'Verificando...' : 'Já criei — verificar de novo'}
            </button>
            <a
              href={consoleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-amber-900 ring-1 ring-amber-300 transition hover:bg-amber-100"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Abrir o Firestore
            </a>
          </div>

          {result === 'not-found' && (
            <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 font-semibold text-red-700 ring-1 ring-red-200">
              Ainda não encontrei. Confira a coleção <strong>admins</strong> e o ID do documento
              (veja a dica abaixo).
            </p>
          )}
          {result === 'found' && (
            <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 font-semibold text-green-700 ring-1 ring-green-200">
              Documento encontrado! O Painel Admin já está liberado.
            </p>
          )}

          <div className="mt-2 rounded-lg bg-white/70 px-3 py-2 ring-1 ring-amber-200">
            <p className="font-semibold">⚠️ Cuidado com o Auto-ID do Console</p>
            <p className="mt-0.5">
              Ao criar o primeiro documento, o Console preenche o campo <em>Document ID</em> com um
              botão <strong>Auto-ID</strong>. Você precisa apagar esse valor e colar o ID acima —
              senão o documento é criado com um ID aleatório e o app não o encontra.
            </p>
            <p className="mt-0.5">
              Caminho certo: <strong>Firestore → Dados → Iniciar coleção</strong> → ID da coleção{' '}
              <code className="font-mono text-xs">admins</code> → <strong>ID do documento</strong> =
              o ID acima → qualquer campo (ex.: <code className="font-mono text-xs">role</code> ={' '}
              <code className="font-mono text-xs">owner</code>).
            </p>
          </div>

          <p className="mt-2 text-xs">
            Para remover o acesso depois, basta apagar esse documento. Passo a passo completo em{' '}
            <strong>FIREBASE_SECURITY_SETUP.md</strong>.
          </p>
        </div>

        <button
          onClick={onDismiss}
          title="Fechar aviso"
          className="self-start rounded-full p-1 text-amber-700 transition hover:bg-amber-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
