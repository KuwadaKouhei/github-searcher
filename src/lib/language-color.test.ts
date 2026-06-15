import { describe, it, expect } from 'vitest';
import { languageColor } from './language-color';

describe('languageColor', () => {
  it('既知の言語は対応する色を返す', () => {
    expect(languageColor('TypeScript')).toBe('#3178c6');
    expect(languageColor('Go')).toBe('#00ADD8');
  });

  it('未知の言語・null・undefined は中立色にフォールバックする', () => {
    const fallback = '#94a3b8';
    expect(languageColor('UnknownLang')).toBe(fallback);
    expect(languageColor(null)).toBe(fallback);
    expect(languageColor(undefined)).toBe(fallback);
  });
});
