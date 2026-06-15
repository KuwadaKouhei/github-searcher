import Image from "next/image";

type Props = {
  owner: string;
  url: string;
  size: number;
  /** 角丸（px）。既定は 14 */
  radius?: number;
};

/** リポジトリオーナーのアバター。URL が空（不正スキーム等）なら頭文字にフォールバック */
export function RepoAvatar({ owner, url, size, radius = 14 }: Props) {
  if (url) {
    return (
      <Image
        src={url}
        alt={owner}
        width={size}
        height={size}
        className="shrink-0 object-cover ring-1 ring-inset ring-black/5"
        style={{ borderRadius: radius }}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="grid shrink-0 place-items-center bg-secondary font-semibold text-muted-foreground ring-1 ring-inset ring-border"
      style={{ width: size, height: size, fontSize: size * 0.4, borderRadius: radius }}
    >
      {owner.charAt(0).toUpperCase()}
    </div>
  );
}
