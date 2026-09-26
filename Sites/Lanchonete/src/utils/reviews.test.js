import { describe, it, expect } from 'vitest';
import { hasVotedHelpful, nextHelpfulState } from './reviews';

const UID = 'user-abc';
const OTHER = 'user-xyz';

describe('hasVotedHelpful', () => {
  it('is false before voting', () => {
    expect(hasVotedHelpful({ helpfulBy: [] }, { uid: UID })).toBe(false);
  });

  it('is true once the uid is recorded', () => {
    expect(hasVotedHelpful({ helpfulBy: [UID] }, { uid: UID })).toBe(true);
  });

  it('tolerates legacy documents without helpfulBy', () => {
    expect(hasVotedHelpful({ helpful: 8 }, { uid: UID })).toBe(false);
  });

  it('is always false when signed out', () => {
    expect(hasVotedHelpful({ helpfulBy: [UID] }, { uid: undefined })).toBe(false);
  });

  it('uses the local list for seeded/demo reviews', () => {
    const mock = { id: 3, isMock: true, helpful: 8 };
    expect(hasVotedHelpful(mock, { uid: UID, votedMockIds: [] })).toBe(false);
    expect(hasVotedHelpful(mock, { uid: UID, votedMockIds: [3] })).toBe(true);
  });
});

describe('nextHelpfulState (toggle)', () => {
  it('counts a first vote', () => {
    expect(nextHelpfulState({ helpful: 8, helpfulBy: [] }, UID)).toEqual({ voted: true, helpful: 9 });
  });

  it('cancels a vote on the second click', () => {
    expect(nextHelpfulState({ helpful: 9, helpfulBy: [UID] }, UID)).toEqual({ voted: false, helpful: 8 });
  });

  it('never lets the counter go below zero', () => {
    expect(nextHelpfulState({ helpful: 0, helpfulBy: [UID] }, UID)).toEqual({ voted: false, helpful: 0 });
  });

  it('defaults a missing counter to 1', () => {
    expect(nextHelpfulState({ id: 'r1' }, UID)).toEqual({ voted: true, helpful: 1 });
  });

  it('ignores anonymous voters', () => {
    expect(nextHelpfulState({ helpful: 3, helpfulBy: [] }, undefined)).toBeNull();
  });

  it('lets another account vote independently', () => {
    expect(nextHelpfulState({ helpful: 9, helpfulBy: [UID] }, OTHER)).toEqual({ voted: true, helpful: 10 });
  });

  it('cannot be inflated by repeated clicks from one account', () => {
    // Simulates the Firestore transaction: read -> toggle -> write.
    let doc = { helpful: 8, helpfulBy: [] };
    const click = () => {
      const next = nextHelpfulState(doc, UID);
      if (!next) return;
      const voters = new Set(doc.helpfulBy);
      if (next.voted) voters.add(UID); else voters.delete(UID);
      doc = { helpful: next.helpful, helpfulBy: [...voters] };
    };

    let highest = 0;
    for (let i = 0; i < 10; i += 1) {
      click();
      highest = Math.max(highest, doc.helpful);
    }

    expect(highest).toBe(9);
    expect(doc.helpfulBy).toEqual([]); // even number of clicks -> cancelled
  });
});
