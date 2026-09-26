import { describe, it, expect } from 'vitest';
import { digitsOnly, formatAddress, summarizeAddress, isDeliverable } from './address';

const full = {
  zip: '01000-000',
  street: 'Rua das Flores',
  number: '123',
  complement: 'Apto 42',
  district: 'Centro',
  city: 'São Paulo',
};

describe('formatAddress', () => {
  it('renders the full address for the driver', () => {
    expect(formatAddress(full)).toBe('Rua das Flores, 123 — Apto 42 — Centro, São Paulo — CEP 01000-000');
  });

  it('omits the complement when there is none', () => {
    expect(formatAddress({ ...full, complement: '' }))
      .toBe('Rua das Flores, 123 — Centro, São Paulo — CEP 01000-000');
  });

  it('omits the CEP when missing', () => {
    expect(formatAddress({ ...full, zip: '', complement: '' }))
      .toBe('Rua das Flores, 123 — Centro, São Paulo');
  });

  it('is empty for a missing address', () => {
    expect(formatAddress(null)).toBe('');
  });
});

describe('summarizeAddress', () => {
  it('produces a compact one-liner', () => {
    expect(summarizeAddress(full)).toBe('Rua das Flores, 123 — Apto 42 — Centro — São Paulo');
  });

  it('is empty for a missing address', () => {
    expect(summarizeAddress(undefined)).toBe('');
  });
});

describe('digitsOnly', () => {
  it('strips formatting from a phone number', () => {
    expect(digitsOnly('(11) 91234-5678')).toBe('11912345678');
  });

  it('is null-safe', () => {
    expect(digitsOnly(null)).toBe('');
    expect(digitsOnly(undefined)).toBe('');
  });
});

describe('isDeliverable', () => {
  it('is true when the order has contact and address', () => {
    expect(isDeliverable({ customer: { name: 'Ana', phone: '11999999999' }, address: full })).toBe(true);
  });

  it('is false without a phone', () => {
    expect(isDeliverable({ customer: { name: 'Ana' }, address: full })).toBe(false);
  });

  it('is false without a street', () => {
    expect(isDeliverable({ customer: { name: 'Ana', phone: '11' }, address: { ...full, street: '' } })).toBe(false);
  });

  it('is false for a legacy order with no address', () => {
    expect(isDeliverable({ customer: undefined, address: undefined })).toBe(false);
  });
});
