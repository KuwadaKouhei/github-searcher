"use client";

import { useRouter } from "next/navigation";

export function BackLink() {
  const router = useRouter();

  const handleClick = () => {
    // 同一オリジン内の遷移履歴があればそこへ戻る（検索条件・ページ・スクロール位置が復元される）
    // 直アクセス等で履歴がない場合はトップへ
    if (
      window.history.length > 1 &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
    >
      ← 検索に戻る
    </button>
  );
}