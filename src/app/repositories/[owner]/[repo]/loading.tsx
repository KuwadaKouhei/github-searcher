function Shimmer({ className }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-md ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <main className="mx-auto max-w-[920px] px-6 pb-28" aria-busy="true">
      <div className="pt-7 pb-2">
        <Shimmer className="h-10 w-44 !rounded-md" />
      </div>

      {/* ヘッダーカード */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-[clamp(24px,4vw,40px)] shadow-[var(--shadow-card-md)]">
        <div className="flex flex-wrap items-start gap-[22px]">
          <Shimmer className="size-[76px] shrink-0 !rounded-[22px]" />
          <div className="flex flex-1 flex-col gap-3">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-9 w-64 max-w-full" />
            <Shimmer className="h-4 w-48" />
          </div>
          <Shimmer className="h-12 w-36 !rounded-lg" />
        </div>
      </div>

      {/* スタット */}
      <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-[126px] !rounded-xl" />
        ))}
      </div>

      {/* 概要 */}
      <div className="mt-[22px] rounded-2xl border border-border bg-card p-[clamp(22px,3vw,30px)] shadow-[var(--shadow-card)]">
        <Shimmer className="mb-[18px] h-6 w-24" />
        <div className="space-y-3">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-11/12" />
          <Shimmer className="h-4 w-3/4" />
        </div>
      </div>
    </main>
  );
}
