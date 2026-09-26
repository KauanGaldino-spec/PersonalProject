import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Check, RotateCcw, Loader2, Trash2 } from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminInbox.css';

const FILTERS = [
  { id: 'open', label: 'Abertas' },
  { id: 'resolved', label: 'Resolvidas' },
  { id: 'all', label: 'Todas' },
];

const STATUS_LABEL = { open: 'Aberta', resolved: 'Resolvida' };

const formatReceived = (message) => {
  if (!message.createdAt?.toDate) return 'agora mesmo';
  return message.createdAt.toDate().toLocaleString('pt-BR', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

export default function SupportAdminTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');
  const [busyId, setBusyId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'supportMessages'),
      (snapshot) => {
        const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        // Newest first (client-side, so no composite index is required).
        fetched.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setMessages(fetched);
        setLoading(false);
      },
      (err) => {
        console.error('Error loading support messages:', err);
        setError('Não foi possível carregar as mensagens.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const changeStatus = async (id, status) => {
    setBusyId(id);
    setError('');

    try {
      await updateDoc(doc(db, 'supportMessages', id), { status });
    } catch (err) {
      console.error('Error updating support message:', err);
      setError('Não foi possível atualizar a mensagem.');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    setBusyId(id);
    setError('');

    try {
      await deleteDoc(doc(db, 'supportMessages', id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Error deleting support message:', err);
      setError('Não foi possível excluir a mensagem.');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-color)]" />
      </div>
    );
  }

  const openCount = messages.filter((item) => (item.status || 'open') === 'open').length;

  const visible = messages.filter((item) =>
    filter === 'all' ? true : (item.status || 'open') === filter
  );

  return (
    <div className="admin-inbox">
      <div className="admin-inbox-top">
        <h2 className="admin-section-title">Mensagens de Suporte</h2>
        <div className="admin-inbox-filters">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              className={`admin-inbox-filter ${filter === id ? 'active' : ''}`}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-inbox-summary">
        <MessageSquare className="w-4 h-4" />
        <span>
          <strong>{openCount}</strong>{' '}
          {openCount === 1 ? 'mensagem aguardando resposta' : 'mensagens aguardando resposta'}
        </span>
      </div>

      {error && <p className="admin-inbox-error">{error}</p>}

      {visible.length === 0 ? (
        <div className="admin-inbox-empty">
          <strong>
            Nenhuma mensagem {filter === 'all' ? 'recebida ainda' : `com status "${STATUS_LABEL[filter]?.toLowerCase()}"`}
          </strong>
          As mensagens enviadas pelo formulário da Central de Ajuda aparecem aqui.
        </div>
      ) : (
        <div className="admin-inbox-list">
          {visible.map((item) => {
            const status = item.status || 'open';
            const busy = busyId === item.id;
            const subject = encodeURIComponent('Resposta - Central de Ajuda');

            return (
              <div
                key={item.id}
                className={`admin-inbox-card ${status === 'resolved' ? 'admin-inbox-card--muted' : ''}`}
              >
                <div className="admin-inbox-card-head">
                  <div>
                    <h3 className="admin-inbox-name">{item.name || 'Sem nome'}</h3>
                    <span className="admin-inbox-date">Recebida em {formatReceived(item)}</span>
                  </div>
                  <span className={`admin-inbox-badge admin-inbox-badge--${status}`}>
                    {STATUS_LABEL[status] || status}
                  </span>
                </div>

                {item.email && (
                  <div className="admin-inbox-meta">
                    <span>
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${item.email}?subject=${subject}`}>{item.email}</a>
                    </span>
                  </div>
                )}

                <p className="admin-inbox-message">{item.message}</p>

                <div className="admin-inbox-actions">
                  {item.email && (
                    <a
                      className="admin-inbox-btn admin-inbox-btn--primary"
                      href={`mailto:${item.email}?subject=${subject}`}
                    >
                      <Mail className="w-4 h-4" />
                      Responder por e-mail
                    </a>
                  )}

                  {status === 'open' ? (
                    <button
                      className="admin-inbox-btn admin-inbox-btn--ghost"
                      disabled={busy}
                      onClick={() => changeStatus(item.id, 'resolved')}
                    >
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      Marcar como resolvida
                    </button>
                  ) : (
                    <button
                      className="admin-inbox-btn admin-inbox-btn--ghost"
                      disabled={busy}
                      onClick={() => changeStatus(item.id, 'open')}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reabrir
                    </button>
                  )}

                  {confirmDeleteId === item.id ? (
                    <>
                      <button
                        className="admin-inbox-btn admin-inbox-btn--danger"
                        disabled={busy}
                        onClick={() => remove(item.id)}
                      >
                        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Confirmar exclusão
                      </button>
                      <button
                        className="admin-inbox-btn admin-inbox-btn--ghost"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        Voltar
                      </button>
                    </>
                  ) : (
                    <button
                      className="admin-inbox-btn admin-inbox-btn--danger"
                      onClick={() => setConfirmDeleteId(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

