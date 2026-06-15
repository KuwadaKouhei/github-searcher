import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/count-up";

type Props = {
  icon: LucideIcon;
  label: string;
  value: number;
  /** 強調表示（Star など）。true でアクセント配色のアイコンチップに */
  accent?: boolean;
};

export function StatCard({ icon: Icon, label, value, accent = false }: Props) {
  return (
    <div className="animate-pop-in relative overflow-hidden rounded-xl border border-border bg-card px-[22px] pt-[22px] pb-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-spring)] hover:-translate-y-[3px] hover:border-[var(--brand-ring)] hover:shadow-[var(--shadow-card-md)]">
      <div
        className={cn(
          "mb-4 grid size-[38px] place-items-center rounded-[11px]",
          accent
            ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
            : "bg-secondary text-muted-foreground"
        )}
      >
        <Icon aria-hidden className="size-[19px]" />
      </div>
      <div className="font-mono text-[clamp(26px,3vw,34px)] font-extrabold leading-none tracking-[-0.03em]">
        <CountUp value={value} format="compact" durationMs={1100} />
      </div>
      <div className="mt-2 text-[13px] font-semibold text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
