import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { SearchResults } from "./components/search-results";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const rawRepo = {
  id: 1, name: "react", full_name: "facebook/react",
  owner: { login: "facebook", avatar_url: "https://avatars.githubusercontent.com/u/1" },
  html_url: "https://github.com/facebook/react",
  description: "desc", language: "JavaScript",
  stargazers_count: 100, watchers_count: 100, subscribers_count: 5,
  forks_count: 3, open_issues_count: 4,
};

describe("検索フロー（結合）", () => {
  it("検索すると一覧が表示される（API→アダプタ→描画が繋がる）", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", () =>
        HttpResponse.json({ total_count: 1, incomplete_results: false, items: [rawRepo] })
      )
    );
    render(await SearchResults({ query: "react", page: 1 }));
    expect(screen.getByText("facebook/react")).toBeInTheDocument();
    expect(screen.getByText(/1\s*件/)).toBeInTheDocument();
  });

  it("0件のとき件数 0 を表示する", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", () =>
        HttpResponse.json({ total_count: 0, incomplete_results: false, items: [] })
      )
    );
    render(await SearchResults({ query: "zzz", page: 1 }));
    expect(screen.getByText(/0\s*件/)).toBeInTheDocument();
  });

  it("sort/order が検索APIのリクエストに反映される", async () => {
    let capturedUrl = "";
    server.use(
      http.get("https://api.github.com/search/repositories", ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({ total_count: 0, incomplete_results: false, items: [] });
      })
    );
    render(await SearchResults({ query: "react", page: 1, sort: "stars", order: "desc" }));
    const sent = new URL(capturedUrl);
    expect(sent.searchParams.get("sort")).toBe("stars");
    expect(sent.searchParams.get("order")).toBe("desc");
  });

  it("不正な sort 値は API に渡さない", async () => {
    let capturedUrl = "";
    server.use(
      http.get("https://api.github.com/search/repositories", ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({ total_count: 0, incomplete_results: false, items: [] });
      })
    );
    render(await SearchResults({ query: "react", page: 1, sort: "evil" }));
    expect(new URL(capturedUrl).searchParams.get("sort")).toBeNull();
  });
});