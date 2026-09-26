import { describe, it, expect } from 'vitest';
import { buildPixPayload, crc16, generateTxId, isValidPixPayload } from './pix';

const base = {
  key: 'teste@exemplo.com',
  name: 'TasteHouse',
  city: 'Sao Paulo',
  amount: 24.9,
  txid: 'THABC123',
};

describe('crc16', () => {
  // Canonical CRC-16/CCITT-FALSE check value. If this ever breaks, every bank
  // app will reject the generated code.
  it('matches the standard check value for "123456789"', () => {
    expect(crc16('123456789')).toBe('29B1');
  });

  it('always returns 4 uppercase hex digits', () => {
    expect(crc16('')).toMatch(/^[0-9A-F]{4}$/);
    expect(crc16('qualquer coisa')).toMatch(/^[0-9A-F]{4}$/);
  });
});

describe('buildPixPayload', () => {
  it('returns null when no key is configured', () => {
    expect(buildPixPayload({ ...base, key: '' })).toBeNull();
    expect(buildPixPayload({ ...base, key: undefined })).toBeNull();
  });

  it('starts with the payload format indicator', () => {
    expect(buildPixPayload(base).startsWith('000201')).toBe(true);
  });

  it('embeds the amount with 2 decimals and its length prefix (this was the old bug)', () => {
    // The previous hardcoded key charged R$ 10,00 for every order.
    expect(buildPixPayload({ ...base, amount: 24.9 })).toContain('540524.90');
    expect(buildPixPayload({ ...base, amount: 137 })).toContain('5406137.00');
  });

  it('marks the transaction as BRL in Brazil', () => {
    const payload = buildPixPayload(base);
    expect(payload).toContain('5303986');
    expect(payload).toContain('5802BR');
  });

  it('passes the PIX key through untouched (e-mail and phone keys)', () => {
    expect(buildPixPayload(base)).toContain('teste@exemplo.com');
    // Phone keys start with "+", which must survive the sanitising of other fields.
    expect(buildPixPayload({ ...base, key: '+5511999999999' })).toContain('+5511999999999');
  });

  it('includes the txid as the reference label', () => {
    expect(buildPixPayload(base)).toContain('THABC123');
  });

  it('strips accents/symbols from the merchant name and city', () => {
    const payload = buildPixPayload({ ...base, name: 'Pizzaria São João!', city: 'São Paulo' });
    expect(payload).toContain('PIZZARIA SAO JOAO');
    expect(payload).toContain('SAO PAULO');
    expect(payload).not.toContain('SÃO');
  });

  it('clamps the merchant name to 25 and the city to 15 characters', () => {
    const payload = buildPixPayload({
      ...base,
      name: 'Um Nome Absurdamente Longo Para Um Recebedor',
      city: 'Uma Cidade Muito Longa Tambem',
    });
    expect(payload).toContain('5925UM NOME ABSURDAMENTE LONG');
    expect(payload).toContain('6015UMA CIDADE MUIT');
  });

  it('produces a self-consistent CRC so bank apps accept it', () => {
    expect(isValidPixPayload(buildPixPayload(base))).toBe(true);
    expect(isValidPixPayload(buildPixPayload({ ...base, amount: 0.01 }))).toBe(true);
  });

  it('produces a different payload for every amount', () => {
    const one = buildPixPayload({ ...base, amount: 10 });
    const two = buildPixPayload({ ...base, amount: 11 });
    expect(one).not.toBe(two);
  });
});

describe('isValidPixPayload', () => {
  it('rejects a tampered payload', () => {
    const payload = buildPixPayload(base);
    const tampered = payload.replace('24.90', '99.90');
    expect(isValidPixPayload(tampered)).toBe(false);
  });

  it('rejects junk', () => {
    expect(isValidPixPayload('')).toBe(false);
    expect(isValidPixPayload(null)).toBe(false);
    expect(isValidPixPayload('1234')).toBe(false);
  });
});

describe('generateTxId', () => {
  it('is alphanumeric and within the 25 char limit', () => {
    const txid = generateTxId();
    expect(txid).toMatch(/^[A-Z0-9]{1,25}$/);
    expect(txid.startsWith('TH')).toBe(true);
  });

  it('differs between calls', () => {
    expect(generateTxId()).not.toBe(generateTxId());
  });
});
