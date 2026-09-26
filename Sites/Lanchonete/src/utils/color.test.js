import { describe, it, expect } from 'vitest';
import { darkenHex } from './color';

// Derives --brand-color-dark from the colour chosen in Painel Admin, so hover
// states follow the white-label brand instead of staying on the default orange.
describe('darkenHex', () => {
  it('darkens the default brand orange', () => {
    expect(darkenHex('#FF6B2B')).toBe('#e05e26');
  });

  it('expands 3-digit shorthand', () => {
    expect(darkenHex('#FFF')).toBe('#e0e0e0');
  });

  it('follows any configured brand colour', () => {
    expect(darkenHex('#3498DB')).toBe('#2e86c1');
  });

  it('honours a custom percentage', () => {
    expect(darkenHex('#FF6B2B', 50)).toBe('#803616');
  });

  it('passes invalid input through untouched', () => {
    expect(darkenHex('not-a-color')).toBe('not-a-color');
    expect(darkenHex('')).toBe('');
  });

  it('always returns a 6-digit hex', () => {
    expect(darkenHex('#000000')).toMatch(/^#[0-9a-f]{6}$/);
  });
});
