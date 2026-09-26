// Darkens a hex color so hover/active states follow the white-label brand color
// instead of staying on the default orange from index.css.
export const darkenHex = (hex, percent = 12) => {
  const clean = String(hex).replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((char) => char + char).join('')
    : clean;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) return hex;

  const value = parseInt(full, 16);
  const factor = 1 - percent / 100;
  const r = Math.max(0, Math.round(((value >> 16) & 255) * factor));
  const g = Math.max(0, Math.round(((value >> 8) & 255) * factor));
  const b = Math.max(0, Math.round((value & 255) * factor));

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};
