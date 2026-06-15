import Link from "next/link";
import { GitFork } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/** ロゴ（フォークアイコン）＋サービス名 */
function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Repo Finder トップへ">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-[10px] bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_var(--brand-ring)]"
      >
        <GitFork className="size-[18px]" strokeWidth={2.4} />
      </span>
      <span className="flex flex-col whitespace-nowrap leading-tight">
        <span className="text-[16.5px] font-black tracking-tight">Repo Finder</span>
        <span className="text-[10.5px] font-semibold tracking-[0.08em] text-muted-foreground/80">
          リポジトリ検索
        </span>
      </span>
    </Link>
  );
}

/** 全ルート共通のヘッダー（sticky・ブラー） */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-[color-mix(in_oklch,var(--background)_78%,transparent)] backdrop-blur-[14px] backdrop-saturate-[1.4]">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-3">
        <Wordmark />
        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
