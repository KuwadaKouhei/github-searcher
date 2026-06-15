import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RepositoryDetail } from "./repository-detail";
import type { RepositoryDetail as RepositoryDetailType } from "@/domain/repository";

const buildDetail = (
  overrides: Partial<RepositoryDetailType> = {}
): RepositoryDetailType => ({
  id: 1,
  fullName: "facebook/react",
  owner: "facebook",
  repo: "react",
  ownerAvatarUrl: "https://avatars.githubusercontent.com/u/69631",
  language: "JavaScript",
  stars: 70274,
  forks: 9800,
  openIssues: 520,
  description: "A library for building UI",
  topics: ["ui", "frontend"],
  watchers: 2667,
  htmlUrl: "https://github.com/facebook/react",
  license: "MIT",
  updatedAt: "2026-06-10T12:00:00Z",
  ...overrides,
});

describe("RepositoryDetail", () => {
  it("オーナー・名前・言語・4つのスタットを表示する", () => {
    render(<RepositoryDetail repository={buildDetail()} />);
    expect(screen.getByRole("heading", { name: "react" })).toBeInTheDocument();
    expect(screen.getByText("facebook")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Star")).toBeInTheDocument();
    expect(screen.getByText("Watcher")).toBeInTheDocument();
    expect(screen.getByText("Fork")).toBeInTheDocument();
    expect(screen.getByText("Issue")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "facebook" })).toBeInTheDocument();
  });

  it("Watcher数として watchers の値が表示される", () => {
    render(<RepositoryDetail repository={buildDetail({ watchers: 2667 })} />);
    expect(screen.getByText("2.7K")).toBeInTheDocument();
  });

  it("ライセンス・トピックを表示する", () => {
    render(<RepositoryDetail repository={buildDetail()} />);
    expect(screen.getByText("MIT")).toBeInTheDocument();
    expect(screen.getByText("ui")).toBeInTheDocument();
    expect(screen.getByText("frontend")).toBeInTheDocument();
  });

  it("language が null のとき「言語情報なし」を表示する", () => {
    render(<RepositoryDetail repository={buildDetail({ language: null })} />);
    expect(screen.getByText("言語情報なし")).toBeInTheDocument();
  });

  it("GitHubへの外部リンクが noopener noreferrer 付きで表示される", () => {
    render(<RepositoryDetail repository={buildDetail()} />);
    const link = screen.getByRole("link", { name: /GitHubで開く/ });
    expect(link).toHaveAttribute("href", "https://github.com/facebook/react");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("htmlUrl が空のとき外部リンクを表示しない", () => {
    render(<RepositoryDetail repository={buildDetail({ htmlUrl: "" })} />);
    expect(
      screen.queryByRole("link", { name: /GitHubで開く/ })
    ).not.toBeInTheDocument();
  });
});
