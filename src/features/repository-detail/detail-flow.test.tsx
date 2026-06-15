import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import RepositoryDetailPage from "@/app/repositories/[owner]/[repo]/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  notFound: vi.fn(),
}));

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const rawDetail = {
  id: 1, name: "react", full_name: "facebook/react",
  owner: { login: "facebook", avatar_url: "https://avatars.githubusercontent.com/u/1" },
  html_url: "https://github.com/facebook/react",
  description: "desc", language: "JavaScript",
  stargazers_count: 70274,
  watchers_count: 70274,   // Star数のエイリアス（罠）
  subscribers_count: 2667, // 真のWatcher数
  forks_count: 9800, open_issues_count: 520,
  topics: ["ui"], license: { spdx_id: "MIT", name: "MIT License" },
  pushed_at: "2026-06-10T12:00:00Z",
};

describe("詳細フロー（結合）", () => {
  it("詳細APIから取得し、Watcher数に subscribers_count が表示される（watchers_count ではない）", async () => {
    server.use(
      http.get("https://api.github.com/repos/facebook/react", () =>
        HttpResponse.json(rawDetail)
      )
    );
    render(
      await RepositoryDetailPage({
        params: Promise.resolve({ owner: "facebook", repo: "react" }),
      })
    );
    expect(
      screen.getByRole("heading", { name: "react" })
    ).toBeInTheDocument();
    expect(screen.getByText("2.7K")).toBeInTheDocument();
  });
});