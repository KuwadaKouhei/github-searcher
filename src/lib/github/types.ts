export type GitHubRepoRaw = {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string; avatar_url: string };
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  watchers_count: number; // ⚠ Star数のエイリアス。使わない
  subscribers_count?: number; // 真のWatcher数。検索結果には含まれない場合がある
  forks_count: number;
  open_issues_count: number;
  topics?: string[]; // 検索結果でも返るが、欠損時は [] にフォールバック
  license?: { spdx_id: string | null; name: string | null } | null;
  pushed_at?: string; // 最終 push 日時（更新日として使用）
  updated_at?: string; // メタデータ更新日時（pushed_at が無い場合のフォールバック）
};

export type GitHubSearchResponseRaw = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoRaw[];
};
