import React, { useState, useEffect } from 'react';
import { CalendarCheck, Users, Mail, MessageSquare, Check, X, Loader2, Trash2 } from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminInbox.css';

const FILTERS = [
  { id: 'pending', label: 'Pendentes' },
  { id: 'confirmed', label: 'Confirmadas' },
  { id: 'cancelled', label: 'Canceladas' },
  { id: 'all', label: 'Todas' },
];

const STATUS_LABEL = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
};

const reservationKey = (item) => `${item.date}T${item.time || '00:00'}`;

const toDate = (item) => {
  const parsed = new Date(reservationKey(item));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatWhen = (item) => {
  const date = toDate(item);
  if (!date) return `${item.date || '?'} ${item.time || ''}`.trim();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  const diffDays = Math.round((day - today) / 86400000);
  const relative = diffDays === 0 ? 'Hoje' : diffDays === 1 ? 'Amanhã' : null;

  const formatted = date.toLocaleDateString('pt-BR', {
    weekday: 'short', day: 'numeric', month: 'short',
  });

  return relative
    ? `${relative} (${formatted}) às ${item.time || '--:--'}`
    : `${formatted} às ${item.time || '--:--'}`;
};

export default function ReservationsAdminTab() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [busyId, setBusyId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'reservations'),
      (snapshot) => {
        setReservations(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
        setLoading(false);
      },
      (err) => {
        console.error('Error loading reservations:', err);
        setError('Não foi possível carregar as reservas.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const changeStatus = async (id, status) => {
    setBusyId(id);
    setError('');

    try {
      await updateDoc(doc(db, 'reservations', id), { status });
    } catch (err) {
      console.error('Error updating reservation:', err);
      setError('Não foi possível atualizar a reserva.');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    setBusyId(id);
    setError('');

    try {
      await deleteDoc(doc(db, 'reservations', id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Error deleting reservation:', err);
      setError('Não foi possível excluir a reserva.');
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

  const counts = reservations.reduce((acc, item) => {
    const status = item.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const visible = reservations
    .filter((item) => (filter === 'all' ? true : (item.status || 'pending') === filter))
    .map((item) => ({ ...item, past: (toDate(item) ?? new Date(0)) < new Date() }))
    .sort((a, b) => {
      // Upcoming first (soonest at the top), then past ones (most recent first).
      if (a.past !== b.past) return a.past ? 1 : -1;
      return a.past
        ? reservationKey(b).localeCompare(reservationKey(a))
        : reservationKey(a).localeCompare(reservationKey(b));
    });

  return (
    <div className="admin-inbox">
      <div className="admin-inbox-top">
        <h2 className="admin-section-title">Reservas de Mesa</h2>
        <div className="admin-inbox-filters">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              className={`admin-inbox-filter ${filter === id ? 'active' : ''}`}
              onClick={() => setFilter(id)}
            >
              {label}
              {id !== 'all' && counts[id] ? ` (${counts[id]})` : ''}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="admin-inbox-error">{error}</p>}

      {visible.length === 0 ? (
        <div className="admin-inbox-empty">
          <strong>
            Nenhuma reserva {filter === 'all' ? 'recebida ainda' : `com status "${STATUS_LABEL[filter]?.toLowerCase()}"`}
          </strong>
          Os pedidos de reserva enviados pelo site aparecem aqui.
        </div>
      ) : (
        <div className="admin-inbox-list">
          {visible.map((item) => {
            const status = item.status || 'pending';
            const busy = busyId === item.id;

            return (
              <div
                key={item.id}
                className={`admin-inbox-card ${status === 'cancelled' ? 'admin-inbox-card--muted' : ''}`}
              >
                <div className="admin-inbox-card-head">
                  <div>
                    <h3 className="admin-inbox-name">{item.name || 'Sem nome'}</h3>
                    <span className="admin-inbox-date">
                      Pedido em {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString('pt-BR', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                          })
                        : 'agora mesmo'}
                    </span>
                  </div>
                  <span className={`admin-inbox-badge admin-inbox-badge--${status}`}>
                    {STATUS_LABEL[status] || status}
                  </span>
                </div>

                <div className="admin-inbox-meta">
                  <span><CalendarCheck className="w-4 h-4" /> {formatWhen(item)}</span>
                  <span>
                    <Users className="w-4 h-4" /> {item.guests} {item.guests === 1 ? 'pessoa' : 'pessoas'}
                  </span>
                  {item.email && (
                    <span><Mail className="w-4 h-4" /> <a href={`mailto:${item.email}`}>{item.email}</a></span>
                  )}
                </div>

                {item.requests && (
                  <p className="admin-inbox-message">
                    <MessageSquare className="w-4 h-4" style={{ display: 'inline', marginRight: '0.4rem' }} />
                    {item.requests}
                  </p>
                )}

                <div className="admin-inbox-actions">
                  {status !== 'confirmed' && (
                    <button
                      className="admin-inbox-btn admin-inbox-btn--primary"
                      disabled={busy}
                      onClick={() => changeStatus(item.id, 'confirmed')}
                    >
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      Confirmar
                    </button>
                  )}

                  {status !== 'cancelled' && (
                    <button
                      className="admin-inbox-btn admin-inbox-btn--ghost"
                      disabled={busy}
                      onClick={() => changeStatus(item.id, 'cancelled')}
                    >
                      <X className="w-4 h-4" />
                      Cancelar
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

