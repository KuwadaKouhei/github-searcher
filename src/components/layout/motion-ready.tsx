"use client";

import { useEffect } from "react";

/**
 * 実ブラウザが実際に描画を始めたタイミング（2フレーム後）で
 * <html> に motion-ready クラスを付与する。
 * これを目印に CountUp などの「動くと0から始まる」演出を解禁し、
 * 印刷・PDF化・凍結タイムラインのプレビューでは静止状態（最終値）を保つ。
 */
export function MotionReady() {
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.documentElement.classList.add("motion-ready")
      )
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
