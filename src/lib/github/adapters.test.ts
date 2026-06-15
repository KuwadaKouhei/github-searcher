import { describe, it, expect } from 'vitest';
import { toRepository, toRepositoryDetail } from './adapters';
import type { GitHubRepoRaw } from './types';

const buildRaw = (overrides: Partial<GitHubRepoRaw> = {}): GitHubRepoRaw => ({
  id: 1,
  name: 'react',
  full_name: 'facebook/react',
  owner: { login: 'facebook', avatar_url: 'https://avatars.githubusercontent.com/u/69631' },
  html_url: 'https://github.com/facebook/react',
  description: 'A library for building UI',
  language: 'JavaScript',
  stargazers_count: 70274,
  watchers_count: 70274,
  subscribers_count: 2667,
  forks_count: 9800,
  open_issues_count: 520,
  topics: ['ui', 'frontend'],
  license: { spdx_id: 'MIT', name: 'MIT License' },
  pushed_at: '2026-06-10T12:00:00Z',
  ...overrides,
});

describe('toRepository', () => {
  it('snake_case のフィールドを camelCase のドメイン型に変換する', () => {
    const r = toRepository(buildRaw());
    expect(r).toEqual({
      id: 1,
      fullName: 'facebook/react',
      owner: 'facebook',
      repo: 'react',
      ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/69631',
      language: 'JavaScript',
      stars: 70274,
      forks: 9800,
      openIssues: 520,
      description: 'A library for building UI',
      topics: ['ui', 'frontend'],
    });
  });

  it('topics が欠損しているとき空配列にフォールバックする', () => {
    expect(toRepository(buildRaw({ topics: undefined })).topics).toEqual([]);
  });

  it('language が null のとき null を保持する', () => {
    expect(toRepository(buildRaw({ language: null })).language).toBeNull();
  });

  it('description が null のとき null を保持する', () => {
    expect(toRepository(buildRaw({ description: null })).description).toBeNull();
  });

  it('avatar_url が http/https 以外のスキームのとき空文字にする', () => {
    const r = toRepository(buildRaw({ owner: { login: 'x', avatar_url: 'javascript:alert(1)' } }));
    expect(r.ownerAvatarUrl).toBe('');
  });
});

describe('toRepositoryDetail', () => {
  it('watchers には watchers_count ではなく subscribers_count を使う', () => {
    const d = toRepositoryDetail(buildRaw({ watchers_count: 70274, subscribers_count: 2667 }));
    expect(d.watchers).toBe(2667);
  });

  it('subscribers_count が欠損しているとき 0 にフォールバックする', () => {
    const d = toRepositoryDetail(buildRaw({ subscribers_count: undefined }));
    expect(d.watchers).toBe(0);
  });

  it('html_url が http/https 以外のスキームのとき空文字にする', () => {
    const d = toRepositoryDetail(buildRaw({ html_url: 'javascript:alert(1)' }));
    expect(d.htmlUrl).toBe('');
  });

  it('forks / openIssues を変換する', () => {
    const d = toRepositoryDetail(buildRaw());
    expect(d.forks).toBe(9800);
    expect(d.openIssues).toBe(520);
  });

  it('license は spdx_id を採用し、NOASSERTION/未設定は null にする', () => {
    expect(toRepositoryDetail(buildRaw()).license).toBe('MIT');
    expect(
      toRepositoryDetail(buildRaw({ license: { spdx_id: 'NOASSERTION', name: 'Other' } }))
        .license
    ).toBeNull();
    expect(toRepositoryDetail(buildRaw({ license: null })).license).toBeNull();
  });

  it('updatedAt は pushed_at を優先し、無ければ updated_at にフォールバックする', () => {
    expect(toRepositoryDetail(buildRaw()).updatedAt).toBe('2026-06-10T12:00:00Z');
    expect(
      toRepositoryDetail(
        buildRaw({ pushed_at: undefined, updated_at: '2026-01-01T00:00:00Z' })
      ).updatedAt
    ).toBe('2026-01-01T00:00:00Z');
    expect(
      toRepositoryDetail(buildRaw({ pushed_at: undefined, updated_at: undefined })).updatedAt
    ).toBe('');
  });
});
