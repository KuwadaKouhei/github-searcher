import { Star, Eye, GitFork, CircleDot, Scale, Clock, Tag, FileText } from "lucide-react";
import type { RepositoryDetail as RepositoryDetailType } from "@/domain/repository";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { LanguageDot } from "@/components/language-dot";
import { RepoAvatar } from "@/components/repo-avatar";
import { StatCard } from "./stat-card";
import { ExternalLink } from "./external-link";

type Props = {
  repository: RepositoryDetailType;
};

function InfoChip({
  icon: Icon,
  children,
}: {
  icon: typeof Scale;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13.5px] font-medium text-muted-foreground">
      <Icon aria-hidden className="size-[15px] text-muted-foreground/70" />
      {children}
    </span>
  );
}

export function RepositoryDetail({ repository }: Props) {
  const updated = formatDate(repository.updatedAt);

  return (
    <article className="flex flex-col">
      {/* ヘッダーカード */}
      <div className="animate-pop-in relative mt-4 overflow-hidden rounded-2xl border border-border bg-card p-[clamp(24px,4vw,40px)] shadow-[var(--shadow-card-md)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(520px_220px_at_100%_0%,var(--brand-soft),transparent_70%)]"
        />
        <div className="relative flex flex-wrap items-start gap-[22px]">
          <RepoAvatar
            owner={repository.owner}
            url={repository.ownerAvatarUrl}
            size={76}
            radius={22}
          />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold text-muted-foreground/80">
              {repository.owner}
            </div>
            <h1 className="mt-0.5 text-[clamp(28px,4.4vw,42px)] font-black leading-[1.05] tracking-[-0.03em]">
              {repository.repo}
            </h1>
            <div className="mt-3.5 flex flex-wrap items-center gap-[18px]">
              <LanguageDot language={repository.language} className="font-semibold" />
              {repository.license && (
                <InfoChip icon={Scale}>{repository.license}</InfoChip>
              )}
              {updated && <InfoChip icon={Clock}>更新 {updated}</InfoChip>}
            </div>
          </div>
          <ExternalLink href={repository.htmlUrl} />
        </div>
      </div>

      {/* スタット */}
      <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        <StatCard icon={Star} label="Star" value={repository.stars} accent />
        <StatCard icon={Eye} label="Watcher" value={repository.watchers} />
        <StatCard icon={GitFork} label="Fork" value={repository.forks} />
        <StatCard icon={CircleDot} label="Issue" value={repository.openIssues} />
      </div>

      {/* 概要 + トピック */}
      {(repository.description || repository.topics.length > 0) && (
        <section className="animate-float-in mt-[22px] rounded-2xl border border-border bg-card p-[clamp(22px,3vw,30px)] shadow-[var(--shadow-card)]">
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="grid size-[30px] place-items-center rounded-[9px] bg-[var(--brand-soft)] text-[var(--brand-strong)]">
              <FileText aria-hidden className="size-4" />
            </span>
            <span className="text-[15px] font-extrabold tracking-tight">概要</span>
          </div>
          {repository.description && (
            <p className="text-[15.5px] leading-[1.95] text-muted-foreground">
              {repository.description}
            </p>
          )}
          {repository.topics.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-2",
                repository.description && "mt-[22px]"
              )}
            >
              {repository.topics.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[var(--brand-soft)] px-3 py-[5px] font-mono text-[12.5px] font-semibold text-[var(--brand-strong)]"
                >
                  <Tag aria-hidden className="size-3" />
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>
      )}
    </article>
  );
}
