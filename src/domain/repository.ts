export type Repository = {
  id: number;
  fullName: string;
  owner: string;
  repo: string;
  ownerAvatarUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  description: string | null;
  topics: string[];
};

export type RepositoryDetail = Repository & {
  watchers: number;
  htmlUrl: string;
  license: string | null;
  /** 最終更新（push）日時の ISO 文字列。空文字なら不明 */
  updatedAt: string;
};
