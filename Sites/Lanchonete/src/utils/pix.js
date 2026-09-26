// BR Code (PIX) payload builder — the EMV® QRCPS-MPM format Brazilian bank apps
// read. Pure functions only (no React, no Firebase) so they are unit-tested in
// src/utils/pix.test.js.
//
// A payload is a flat list of `ID + length + value` fields, closed by field 63
// which holds a CRC16 of everything before it.

const field = (id, value) => {
  const text = String(value ?? '');
  return `${id}${String(text.length).padStart(2, '0')}${text}`;
};

/** CRC16/CCITT-FALSE (polynomial 0x1021, seed 0xFFFF) — the checksum the spec requires. */
export const crc16 = (input) => {
  let crc = 0xffff;

  for (let i = 0; i < input.length; i += 1) {
    crc ^= input.charCodeAt(i) << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
};

// The spec only accepts a reduced character set, so accents/symbols are stripped.
// NEVER applied to the PIX key itself: phone keys contain "+" and e-mail keys "@".
const ascii = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const clip = (value, max) => ascii(value).toUpperCase().slice(0, max);

/** A short, bank-statement-friendly reference. Alphanumeric, max 25 chars. */
export const generateTxId = () =>
  `TH${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 25);

/**
 * Builds the "copia e cola" string for a single payment.
 * Returns null when no key is configured — the UI must not offer PIX in that case.
 */
export const buildPixPayload = ({ key, name, city, amount, txid }) => {
  if (!key) return null;

  const merchantAccount = field('00', 'br.gov.bcb.pix') + field('01', key);
  const reference = ascii(txid).replace(/\s/g, '').slice(0, 25) || '***';
  const total = Number(amount);

  const partial =
    field('00', '01') + // payload format indicator
    field('01', '12') + // single-use code (each order renders its own)
    field('26', merchantAccount) +
    field('52', '0000') + // merchant category
    field('53', '986') + // currency: BRL
    field('54', Number.isFinite(total) ? total.toFixed(2) : '0.00') +
    field('58', 'BR') +
    field('59', clip(name || 'RECEBEDOR', 25)) +
    field('60', clip(city || 'CIDADE', 15)) +
    field('62', field('05', reference)) + // referencia = nosso txid
    '6304';

  return partial + crc16(partial);
};

/** True when the payload's own CRC matches — used by the tests and by diagnostics. */
export const isValidPixPayload = (payload) => {
  if (typeof payload !== 'string' || payload.length < 8) return false;

  const body = payload.slice(0, -4);
  const checksum = payload.slice(-4);

  return body.endsWith('6304') && crc16(body) === checksum;
};
