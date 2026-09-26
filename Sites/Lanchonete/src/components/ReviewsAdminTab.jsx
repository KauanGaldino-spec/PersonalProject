import React, { useState, useEffect } from 'react';
import { Star, Trash2, Loader2, ThumbsUp, MessageSquare } from 'lucide-react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminInbox.css';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'positive', label: 'Positivas' },
  { id: 'negative', label: 'Negativas' },
];

const formatDate = (review) => {
  if (!review.createdAt?.toDate) return 'data desconhecida';
  return review.createdAt.toDate().toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
};

export default function ReviewsAdminTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'reviews'),
      (snapshot) => {
        const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        // Newest first (client-side, so no composite index is required).
        fetched.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setReviews(fetched);
        setLoading(false);
      },
      (err) => {
        console.error('Error loading reviews:', err);
        setError('Não foi possível carregar as avaliações.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const remove = async (id) => {
    setBusyId(id);
    setError('');

    try {
      await deleteDoc(doc(db, 'reviews', id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Não foi possível excluir a avaliação.');
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

  const average = reviews.length
    ? (reviews.reduce((sum, item) => sum + (item.rating || 0), 0) / reviews.length).toFixed(1)
    : '0.0';

  const negativeCount = reviews.filter((item) => (item.rating || 0) <= 2).length;

  const visible = reviews.filter((item) => {
    if (filter === 'positive') return (item.rating || 0) >= 4;
    if (filter === 'negative') return (item.rating || 0) <= 2;
    return true;
  });

  return (
    <div className="admin-inbox">
      <div className="admin-inbox-top">
        <h2 className="admin-section-title">Moderação de Avaliações</h2>
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
        <Star className="w-4 h-4" />
        <span>
          Média <strong>{average}</strong> em {reviews.length}{' '}
          {reviews.length === 1 ? 'avaliação' : 'avaliações'}
          {negativeCount > 0 && ` · ${negativeCount} negativa${negativeCount === 1 ? '' : 's'}`}
        </span>
      </div>

      {error && <p className="admin-inbox-error">{error}</p>}

      {visible.length === 0 ? (
        <div className="admin-inbox-empty">
          <strong>Nenhuma avaliação para exibir</strong>
          As avaliações enviadas pelos clientes aparecem aqui.
        </div>
      ) : (
        <div className="admin-inbox-list">
          {visible.map((item) => {
            const busy = busyId === item.id;
            const rating = item.rating || 0;

            return (
              <div key={item.id} className="admin-inbox-card">
                <div className="admin-inbox-card-head">
                  <div>
                    <h3 className="admin-inbox-name">{item.name || 'Cliente'}</h3>
                    <span className="admin-inbox-date">{formatDate(item)}</span>
                  </div>
                  <span className="admin-inbox-badge admin-inbox-badge--resolved">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-3.5 h-3.5"
                        style={{
                          color: star <= rating ? '#F5B301' : '#D6D6D6',
                          fill: star <= rating ? '#F5B301' : 'transparent',
                        }}
                      />
                    ))}
                  </span>
                </div>

                <p className="admin-inbox-message">{item.comment}</p>

                <div className="admin-inbox-meta" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                  <span><ThumbsUp className="w-4 h-4" /> {item.helpful || 0} marcaram como útil</span>
                  {(item.helpfulBy?.length || 0) > 0 && (
                    <span><MessageSquare className="w-4 h-4" /> {item.helpfulBy.length} votante(s)</span>
                  )}
                </div>

                <div className="admin-inbox-actions">
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
                      Excluir avaliação
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

