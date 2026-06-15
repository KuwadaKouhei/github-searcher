import { Search } from "lucide-react";

type Props = {
  query: string;
};

export function EmptyState({ query }: Props) {
  return (
    <div className="animate-pop-in py-20 text-center">
      <div className="empty-icon mx-auto mb-[22px] grid size-[76px] place-items-center rounded-[22px] bg-[var(--brand-soft)] text-[var(--brand-strong)]">
        <Search className="size-8" />
      </div>
      <p className="mb-2 text-xl font-bold">
        「{query}」に一致するリポジトリは存在しません
      </p>
      <p className="text-[15px] text-muted-foreground">
        キーワードを変えて、もう一度お試しください。
      </p>
    </div>
  );
}
