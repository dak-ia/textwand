import { copyright } from "./copyright";

describe("copyright", () => {
  it("開始年と現在年が同じ場合は開始年だけを返す", () => {
    expect(copyright(2026, 2026)).toBe("2026");
  });

  it("現在年が開始年より後なら年範囲を返す", () => {
    expect(copyright(2021, 2026)).toBe("2021–2026");
  });

  it("開始年翌年でも範囲表記になる", () => {
    expect(copyright(2021, 2022)).toBe("2021–2022");
  });

  it("現在年が開始年より前でも開始年だけを返す", () => {
    expect(copyright(2021, 2020)).toBe("2021");
  });

  it("currentYearを省略した場合は現在年をデフォルトとして使う", () => {
    const now = new Date().getFullYear();
    expect(copyright(2021)).toBe(copyright(2021, now));
  });
});
