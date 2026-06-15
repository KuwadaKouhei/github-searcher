import type { Repository, RepositoryDetail } from '@/domain/repository';
import type { GitHubRepoRaw } from './types';

/** http/https のみ許可。それ以外（javascript: 等）は空文字に落とす */
const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? url : '';
  } catch {
    return '';
  }
};

/** spdx_id を表示用ライセンス文字列に正規化。未設定/不明は null */
const normalizeLicense = (
  license: GitHubRepoRaw['license']
): string | null => {
  const spdx = license?.spdx_id;
  if (!spdx || spdx === 'NOASSERTION') return null;
  return spdx;
};

export const toRepository = (raw: GitHubRepoRaw): Repository => ({
  id: raw.id,
  fullName: raw.full_name,
  owner: raw.owner.login,
  repo: raw.name,
  ownerAvatarUrl: sanitizeUrl(raw.owner.avatar_url),
  language: raw.language,
  stars: raw.stargazers_count,
  forks: raw.forks_count,
  openIssues: raw.open_issues_count,
  description: raw.description,
  topics: raw.topics ?? [],
});

export const toRepositoryDetail = (raw: GitHubRepoRaw): RepositoryDetail => ({
  ...toRepository(raw),
  watchers: raw.subscribers_count ?? 0, // 真のWatcher数。watchers_countはStar数のエイリアスのため使わない
  htmlUrl: sanitizeUrl(raw.html_url),
  license: normalizeLicense(raw.license),
  updatedAt: raw.pushed_at ?? raw.updated_at ?? '',
});
