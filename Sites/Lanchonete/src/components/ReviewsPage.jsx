import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User, Loader2 } from 'lucide-react';
import {
  collection, onSnapshot, addDoc, doc, runTransaction, arrayUnion, arrayRemove, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { hasVotedHelpful, nextHelpfulState } from '../utils/reviews';
import './ReviewsPage.css';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Carlos Santos',
    rating: 5,
    date: '24 de Setembro, 2026',
    comment: 'Comida excelente! A pizza estava super quente e a massa é muito leve. A entrega foi muito rápida, antes mesmo do prazo. Definitivamente pedirei de novo.',
    helpful: 12,
  },
  {
    id: 2,
    name: 'Amanda Oliveira',
    rating: 4,
    date: '22 de Setembro, 2026',
    comment: 'O hambúrguer estava muito saboroso, mas a batata frita chegou um pouco murcha. Tirando isso, o tempero é maravilhoso.',
    helpful: 5,
  },
  {
    id: 3,
    name: 'João Silva',
    rating: 5,
    date: '20 de Setembro, 2026',
    comment: 'Melhor restaurante da região. O combo de sushi é sempre muito fresco e bem preparado. Atendimento nota 10.',
    helpful: 8,
  },
];

export default function ReviewsPage({ user, onOpenAuth }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Ids of the in-memory (seeded) reviews this visitor already marked as helpful.
  const [votedMocks, setVotedMocks] = useState([]);
  // Review id -> true while its Firestore transaction is running (blocks re-clicks).
  const [helpfulBusy, setHelpfulBusy] = useState({});

  useEffect(() => {
    // Plain collection + client-side sort keeps the app index-free (same approach as orders).
    const unsubscribe = onSnapshot(
      collection(db, 'reviews'),
      (snapshot) => {
        if (snapshot.empty) {
          // Show the seeded reviews until real ones exist (isMock = never written back).
          setReviews(INITIAL_REVIEWS.map((review) => ({ ...review, isMock: true })));
        } else {
          const fetched = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
          fetched.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
          });
          setReviews(fetched);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error loading reviews:", err);
        setReviews(INITIAL_REVIEWS.map((review) => ({ ...review, isMock: true })));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewText.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user?.uid || null,
        name: user?.displayName || 'Usuário',
        rating: newRating,
        comment: newReviewText.trim(),
        helpful: 0,
        createdAt: serverTimestamp(),
      });

      setNewReviewText('');
      setNewRating(5);
    } catch (err) {
      console.error("Error saving review:", err);
      setError('Não foi possível enviar sua avaliação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  // A visitor may mark a review as helpful exactly once.
  const didVoteHelpful = (review) =>
    hasVotedHelpful(review, { uid: user?.uid, votedMockIds: votedMocks });

  const handleHelpful = async (review) => {
    // Only ignore re-clicks while a write for this review is in flight (the button
    // stays clickable otherwise so the vote can be cancelled).
    if (helpfulBusy[review.id]) return;

    // Seeded/demo reviews only exist in memory, so toggle the vote locally.
    if (review.isMock) {
      const wasVoted = votedMocks.includes(review.id);

      setVotedMocks((prev) => (
        wasVoted ? prev.filter((id) => id !== review.id) : [...prev, review.id]
      ));
      setReviews((prev) => prev.map((item) => (
        item.id === review.id
          ? { ...item, helpful: Math.max(0, (item.helpful || 0) + (wasVoted ? -1 : 1)) }
          : item
      )));
      return;
    }

    // We must know who voted to allow one vote per person (and to undo it).
    if (!user) {
      onOpenAuth?.();
      return;
    }

    setHelpfulBusy((prev) => ({ ...prev, [review.id]: true }));

    try {
      const reviewRef = doc(db, 'reviews', review.id);

      await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(reviewRef);
        if (!snapshot.exists()) return;

        const next = nextHelpfulState(snapshot.data(), user.uid);
        if (!next) return;

        transaction.update(reviewRef, {
          helpful: next.helpful,
          // Vote -> add the uid; cancel -> remove it.
          helpfulBy: next.voted ? arrayUnion(user.uid) : arrayRemove(user.uid),
        });
      });
    } catch (err) {
      console.error("Error updating review:", err);
    } finally {
      setHelpfulBusy((prev) => {
        const next = { ...prev };
        delete next[review.id];
        return next;
      });
    }
  };

  const formatReviewDate = (review) => {
    if (review.date) return review.date;
    const date = review.createdAt?.toDate ? review.createdAt.toDate() : null;
    if (!date) return 'Agora mesmo';
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="reviews-page flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-color)]" />
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <div>
          <h1 className="reviews-title">Avaliações</h1>
          <p className="reviews-subtitle">O que nossos clientes dizem sobre nós</p>
        </div>
      </div>

      <div className="reviews-content">
        <div className="reviews-sidebar">
          <div className="rating-summary-card">
            <h3 className="summary-title">Média de Avaliações</h3>
            <div className="summary-score">
              <span className="big-number">{avgRating}</span>
              <span className="max-number">/ 5</span>
            </div>
            <div className="summary-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-5 h-5 ${star <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="summary-count">Baseado em {reviews.length} avaliações</p>
          </div>

          <div className="write-review-card">
            <h3 className="write-title">Deixe sua avaliação</h3>
            {user ? (
              <form onSubmit={handleSubmit} className="write-review-form">
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      className="star-btn"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                    >
                      <Star className={`w-6 h-6 ${(hoverRating || newRating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Conte-nos sobre sua experiência..."
                  className="review-textarea"
                  rows="4"
                  maxLength={2000}
                  required
                />
                {error && <p className="review-error">{error}</p>}
                <button type="submit" className="submit-review-btn" disabled={submitting}>
                  {submitting ? 'Enviando...' : 'Enviar Avaliação'}
                </button>
              </form>
            ) : (
              <div className="login-prompt">
                <p>Faça login para avaliar seus pedidos.</p>
                <button onClick={() => onOpenAuth?.()} className="login-btn">Fazer Login</button>
              </div>
            )}
          </div>
        </div>

        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="review-date">{formatReviewDate(review)}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-actions">
                <button
                  className={`helpful-btn ${didVoteHelpful(review) ? 'helpful-btn--voted' : ''}`}
                  onClick={() => handleHelpful(review)}
                  disabled={Boolean(helpfulBusy[review.id])}
                  aria-pressed={didVoteHelpful(review)}
                  title={didVoteHelpful(review)
                    ? 'Cancelar marcação de útil'
                    : 'Marcar como útil'}
                >
                  <ThumbsUp className="helpful-icon w-4 h-4" />
                  Útil ({review.helpful || 0})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
