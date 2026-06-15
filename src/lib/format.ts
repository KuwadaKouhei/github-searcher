export const formatCompact = (n: number): string =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(n);

/** ISO 文字列を「YYYY/MM/DD」表記に整形。空・不正値は空文字を返す */
export const formatDate = (iso: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
};
