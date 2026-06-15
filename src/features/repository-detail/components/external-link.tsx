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
      className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
    >
      GitHubで開く
      <ExternalLinkIcon aria-hidden className="size-4" />
    </a>
  );
}