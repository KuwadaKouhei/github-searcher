import type { LucideIcon } from "lucide-react";
import { formatCompact } from "@/lib/format";

type Props = {
  icon: LucideIcon;
  label: string;
  value: number;
};

export function StatBadge({ icon: Icon, label, value }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border p-4">
      <Icon aria-hidden className="size-5 text-muted-foreground" />
      <span className="text-2xl font-bold">{formatCompact(value)}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}