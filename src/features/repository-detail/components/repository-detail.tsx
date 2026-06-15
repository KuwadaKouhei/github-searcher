import Image from "next/image";
import { Star, Eye, GitFork, CircleDot } from "lucide-react";
import type { RepositoryDetail as RepositoryDetailType } from "@/domain/repository";
import { StatBadge } from "./stat-badge";
import { ExternalLink } from "./external-link";

type Props = {
  repository: RepositoryDetailType;
};

export function RepositoryDetail({ repository }: Props) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        {repository.ownerAvatarUrl ? (
          <Image
            src={repository.ownerAvatarUrl}
            alt={repository.owner}
            width={64}
            height={64}
            className="size-16 rounded-full"
          />
        ) : (
          <div aria-hidden className="size-16 rounded-full bg-muted" />
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">{repository.fullName}</h1>
          <p className="text-sm text-muted-foreground">
            {repository.language ?? "言語情報なし"}
          </p>
        </div>
      </header>

      {repository.description && (
        <p className="text-muted-foreground">{repository.description}</p>
      )}

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBadge icon={Star} label="Stars" value={repository.stars} />
        <StatBadge icon={Eye} label="Watchers" value={repository.watchers} />
        <StatBadge icon={GitFork} label="Forks" value={repository.forks} />
        <StatBadge icon={CircleDot} label="Issues" value={repository.openIssues} />
      </dl>

      <ExternalLink href={repository.htmlUrl} />
    </article>
  );
}