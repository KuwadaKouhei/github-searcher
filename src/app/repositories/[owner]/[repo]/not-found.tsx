import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[920px] flex-col items-center gap-4 px-6 py-24 text-center">
      <div className="empty-icon mb-2 grid size-[76px] place-items-center rounded-[22px] bg-[var(--brand-soft)] text-[var(--brand-strong)]">
        <SearchX aria-hidden className="size-8" />
      </div>
      <p className="font-mono text-4xl font-black">404</p>
      <h2 className="text-lg font-bold">リポジトリが見つかりません</h2>
      <p className="text-sm text-muted-foreground">
        指定されたリポジトリは存在しないか、削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-[transform,filter] duration-200 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:brightness-[1.07]"
      >
        検索に戻る
      </Link>
    </main>
  );
}
