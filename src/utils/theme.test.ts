import { parseTheme } from "./theme";

describe("parseTheme", () => {
  it("auto/light/darkはそのまま返す", () => {
    expect(parseTheme("auto")).toBe("auto");
    expect(parseTheme("light")).toBe("light");
    expect(parseTheme("dark")).toBe("dark");
  });

  it("範囲外の文字列はautoを返す", () => {
    expect(parseTheme("solarized")).toBe("auto");
  });

  it("空文字はautoを返す", () => {
    expect(parseTheme("")).toBe("auto");
  });

  it("nullはautoを返す", () => {
    expect(parseTheme(null)).toBe("auto");
  });
});
