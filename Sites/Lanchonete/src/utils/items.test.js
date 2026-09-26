import { describe, it, expect } from 'vitest';
import { sameItem, isFavorite, toggleFavoriteList } from './items';

// Items arrive from two id namespaces: Firestore documents (string ids) and the
// local FALLBACK lists (numeric or "f1" ids), so matching must fall back to names.
const firestoreItem = { id: 'aB3xY9', name: 'Pizza Margherita', price: 10.99 };
const fallbackItem = { id: 4, name: 'Pizza Margherita', price: 10.99 };
const otherItem = { id: 'zzz', name: 'Tiramisu', price: 7.49 };

describe('sameItem', () => {
  it('matches on identical ids', () => {
    expect(sameItem(firestoreItem, { ...firestoreItem, price: 99 })).toBe(true);
  });

  it('matches on name across different id namespaces', () => {
    expect(sameItem(firestoreItem, fallbackItem)).toBe(true);
  });

  it('does not match different items', () => {
    expect(sameItem(firestoreItem, otherItem)).toBe(false);
  });

  it('is null-safe', () => {
    expect(sameItem(null, firestoreItem)).toBe(false);
    expect(sameItem(firestoreItem, undefined)).toBe(false);
  });
});

describe('isFavorite', () => {
  it('finds a favourite across id namespaces', () => {
    expect(isFavorite([firestoreItem], fallbackItem)).toBe(true);
  });

  it('returns false when absent', () => {
    expect(isFavorite([otherItem], firestoreItem)).toBe(false);
  });

  it('tolerates a missing list', () => {
    expect(isFavorite(undefined, firestoreItem)).toBe(false);
  });
});

describe('toggleFavoriteList', () => {
  it('adds an item', () => {
    const result = toggleFavoriteList([], firestoreItem);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('aB3xY9');
  });

  it('removes an item favourited under a different id namespace', () => {
    const added = toggleFavoriteList([], firestoreItem);
    expect(toggleFavoriteList(added, fallbackItem)).toHaveLength(0);
  });

  it('never duplicates the same item', () => {
    const added = toggleFavoriteList([], firestoreItem);
    expect(toggleFavoriteList(added, firestoreItem)).toHaveLength(0);
  });

  it('keeps other favourites intact', () => {
    const added = toggleFavoriteList([], firestoreItem);
    expect(toggleFavoriteList([...added, otherItem], fallbackItem)).toHaveLength(1);
  });

  it('does not mutate the input array', () => {
    const added = toggleFavoriteList([], firestoreItem);
    toggleFavoriteList(added, otherItem);
    expect(added).toHaveLength(1);
  });
});
