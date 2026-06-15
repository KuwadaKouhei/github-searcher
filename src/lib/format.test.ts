import { describe, it, expect } from 'vitest';
import { formatCompact, formatDate } from './format';

describe('formatCompact', () => {
  it('1000未満はそのまま表示する', () => {
    expect(formatCompact(999)).toBe('999');
  });

  it('1000以上は k 表記にする', () => {
    expect(formatCompact(70274)).toBe('70K');
  });

  it('100万以上は M 表記にする', () => {
    expect(formatCompact(1500000)).toBe('1.5M');
  });

  it('0 を表示できる', () => {
    expect(formatCompact(0)).toBe('0');
  });
});

describe('formatDate', () => {
  it('ISO 文字列を YYYY/MM/DD 表記に整形する', () => {
    expect(formatDate('2026-06-10T12:00:00Z')).toBe('2026/06/10');
  });

  it('空文字や不正値は空文字を返す', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate('not-a-date')).toBe('');
  });
});
