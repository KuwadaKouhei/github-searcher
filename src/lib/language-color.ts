/**
 * 言語 → 表示色（GitHub linguist 準拠の代表色）。
 * 一覧カード・詳細の言語ドットで使用する。未知の言語は中立色にフォールバック。
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Elixir: '#6e4a7e',
  Zig: '#ec915c',
  Scala: '#c22d40',
  Lua: '#000080',
  Haskell: '#5e5086',
  PHP: '#4F5D95',
  'Objective-C': '#438eff',
  Perl: '#0298c3',
  Clojure: '#db5855',
  Elm: '#60B5CC',
  OCaml: '#3be133',
  Julia: '#a270ba',
  R: '#198CE7',
  MDX: '#fcb32c',
  Markdown: '#083fa1',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  PowerShell: '#012456',
  Solidity: '#AA6746',
};

const FALLBACK_COLOR = '#94a3b8'; // slate-400 相当の中立色

export const languageColor = (language: string | null | undefined): string =>
  (language && LANGUAGE_COLORS[language]) || FALLBACK_COLOR;
