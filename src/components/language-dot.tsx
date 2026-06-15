import { cn } from "@/lib/utils";
import { languageColor } from "@/lib/language-color";

type Props = {
  language: string | null;
  withName?: boolean;
  className?: string;
};

/** 言語の色ドット＋言語名。language が null のときは「言語情報なし」 */
export function LanguageDot({ language, withName = true, className }: Props) {
  if (!language) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>
        言語情報なし
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span
        aria-hidden
        className="size-[11px] shrink-0 rounded-full ring-1 ring-inset ring-black/10"
        style={{ background: languageColor(language) }}
      />
      {withName && <span className="font-medium text-foreground/90">{language}</span>}
    </span>
  );
}
