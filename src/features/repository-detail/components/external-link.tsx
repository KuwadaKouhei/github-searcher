import { ExternalLink as ExternalLinkIcon } from "lucide-react";

type Props = {
  href: string;
};

export function ExternalLink({ href }: Props) {
  if (!href) return null; // アダプタのスキーム検証で弾かれた場合は出さない

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg bg-primary px-[22px] text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-[transform,filter] duration-200 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:brightness-[1.07] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ExternalLinkIcon aria-hidden className="size-[17px]" />
      GitHubで開く
    </a>
  );
}
