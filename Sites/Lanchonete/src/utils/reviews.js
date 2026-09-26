// "Útil" (helpful) voting rules.
//
// The counter is derived from WHO voted: `helpfulBy` holds the uids that marked the
// review as helpful. That means a visitor votes once, can undo it, and the same
// person can never inflate the count by clicking repeatedly.

// Is this visitor's vote currently active? Drives the button's "voted" (black) state.
export const hasVotedHelpful = (review, { uid, votedMockIds = [] } = {}) => {
  if (!review) return false;

  // Seeded/demo reviews live only in memory, so we track them per session.
  if (review.isMock) return votedMockIds.includes(review.id);

  if (!uid) return false;
  return (review.helpfulBy || []).includes(uid);
};

// Toggles this visitor's vote and returns the next values to write, or null when
// there is nothing to do (no identity). Used inside the Firestore transaction so a
// double click or a second tab can never drift the counter.
export const nextHelpfulState = (review, uid) => {
  if (!review || !uid) return null;

  const alreadyVoted = (review.helpfulBy || []).includes(uid);
  const current = review.helpful || 0;

  return alreadyVoted
    ? { voted: false, helpful: Math.max(0, current - 1) }
    : { voted: true, helpful: current + 1 };
};
