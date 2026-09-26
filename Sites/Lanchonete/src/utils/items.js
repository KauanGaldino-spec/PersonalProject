// Shared identity logic for dishes/menu items.
//
// Items reach us from two different places:
//   * Firestore `menuItems` documents -> string document ids (e.g. "aB3xY9")
//   * the local FALLBACK lists in MenuPage / PopularDishes -> numeric (1..18)
//     or prefixed ("f1".."f3") ids
//
// Because a user can favorite "Pizza Margherita" from the Home carousel and then
// look at the same pizza inside the Menu page (two different id namespaces), we
// compare ids when both sides have one and always fall back to the item name.
export const sameItem = (a, b) => {
  if (!a || !b) return false;

  const aId = a.id ?? a.name;
  const bId = b.id ?? b.name;

  if (aId != null && bId != null && String(aId) === String(bId)) return true;

  return Boolean(a.name) && a.name === b.name;
};

export const isFavorite = (favorites, item) =>
  Array.isArray(favorites) && favorites.some((fav) => sameItem(fav, item));

export const toggleFavoriteList = (favorites, item) =>
  isFavorite(favorites, item)
    ? (favorites || []).filter((fav) => !sameItem(fav, item))
    : [...(favorites || []), item];
