import { test, expect } from '@playwright/test';

// E2E は本物の Next.js サーバー（RSC がサーバー側で GitHub API を叩く）で動作する。
// サーバー側 fetch は page.route（ブラウザ傍受）では捕まえられないため、実APIを使い、
// データの中身に依存しない「主要動線が通ること」を検証する（データの正しさは ③ で担保済み）。
test('検索から詳細閲覧までのハッピーパス', async ({ page }) => {
  // 検索
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'リポジトリを検索' }).fill('react');
  await page.getByRole('button', { name: '検索' }).click();

  // 一覧に結果が出る（最初のリポジトリリンクが表示されるまで待つ）
  const firstResult = page.getByRole('list').getByRole('link').first();
  await expect(firstResult).toBeVisible();

  // 1件目をクリックして詳細へ
  await firstResult.click();

  // 詳細ページで主要項目（統計ラベル）が表示される
  await expect(page.getByText('Star', { exact: true })).toBeVisible();
  await expect(page.getByText('Watcher', { exact: true })).toBeVisible();
  await expect(page.getByText('Fork', { exact: true })).toBeVisible();
  await expect(page.getByText('Issue', { exact: true })).toBeVisible();

  // 「検索に戻る」で一覧へ戻る
  await page.getByRole('button', { name: /トップページへ戻る|検索に戻る/ }).click();
  await expect(page.getByRole('list').getByRole('link').first()).toBeVisible();
});
