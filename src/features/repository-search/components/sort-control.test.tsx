import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortControl } from "./sort-control";

const replaceMock = vi.fn();
let currentParams = new URLSearchParams("q=react");

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
  useSearchParams: () => currentParams,
}));

describe("SortControl", () => {
  beforeEach(() => {
    replaceMock.mockClear();
    currentParams = new URLSearchParams("q=react");
  });

  it("既定では「関連度」が選択されている", () => {
    render(<SortControl />);
    expect(screen.getByRole("combobox", { name: "並び替え" })).toHaveTextContent("関連度");
  });

  it("Star数を選ぶと sort/order を設定し page をリセットした URL に置き換える", async () => {
    currentParams = new URLSearchParams("q=react&page=3");
    const user = userEvent.setup();
    render(<SortControl />);
    await user.click(screen.getByRole("combobox", { name: "並び替え" }));
    await user.click(screen.getByRole("option", { name: "Star数" }));
    expect(replaceMock).toHaveBeenCalledWith("/?q=react&sort=stars&order=desc");
  });

  it("関連度に戻すと sort/order を URL から取り除く", async () => {
    currentParams = new URLSearchParams("q=react&sort=stars&order=desc");
    const user = userEvent.setup();
    render(<SortControl />);
    await user.click(screen.getByRole("combobox", { name: "並び替え" }));
    await user.click(screen.getByRole("option", { name: "関連度" }));
    expect(replaceMock).toHaveBeenCalledWith("/?q=react");
  });
});