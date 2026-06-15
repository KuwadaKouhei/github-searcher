"use client";

import { useEffect, useState } from "react";
import { formatCompact } from "@/lib/format";

/**
 * 整形モード。Server Component から渡せるよう「関数」ではなく文字列で指定する
 * （RSC 境界を関数が越えられないため）。
 * - locale: ロケール区切り（例 245,852）
 * - compact: compact 表記（例 246K）
 */
type FormatMode = "locale" | "compact";

type Props = {
  value: number;
  format?: FormatMode;
  className?: string;
  durationMs?: number;
};

const FORMATTERS: Record<FormatMode, (n: number) => string> = {
  locale: (n) => n.toLocaleString(),
  compact: formatCompact,
};

/**
 * 0 から value までカウントアップする。
 * - SSR / 静止環境（テスト・印刷・凍結タイムライン）では最終値をそのまま表示
 * - 実ブラウザ（<html>.motion-ready）かつ prefers-reduced-motion でない時のみ演出
 *
 * setState はすべて requestAnimationFrame コールバック内で行う（effect 本体での
 * 同期 setState を避ける）。テストでは rAF が同期発火しないため最終値が表示される。
 */
export function CountUp({
  value,
  format = "locale",
  className,
  durationMs = 700,
}: Props) {
  const [display, setDisplay] = useState(value);
  const formatNumber = FORMATTERS[format];

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafWait1 = 0;
    let rafWait2 = 0;
    let rafTick = 0;

    const begin = () => {
      if (reduce || !document.documentElement.classList.contains("motion-ready")) {
        setDisplay(value); // モーション無効環境では最終値
        return;
      }
      const from = 0;
      const to = value;
      let start = 0;
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplay(Math.round(from + (to - from) * eased));
        if (p < 1) rafTick = requestAnimationFrame(tick);
      };
      rafTick = requestAnimationFrame(tick);
    };

    // 実ブラウザの描画後（テストでは同期的に発火しない）に開始
    rafWait1 = requestAnimationFrame(() => {
      rafWait2 = requestAnimationFrame(begin);
    });

    return () => {
      cancelAnimationFrame(rafWait1);
      cancelAnimationFrame(rafWait2);
      cancelAnimationFrame(rafTick);
    };
  }, [value, durationMs]);

  return <span className={className}>{formatNumber(display)}</span>;
}
