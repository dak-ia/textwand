import { isKana } from "./isKana";

describe("isKana", () => {
  it("ひらがな(ぁ〜ゖ)はtrue", () => {
    expect(isKana("ぁ")).toBe(true);
    expect(isKana("あ")).toBe(true);
    expect(isKana("ん")).toBe(true);
    expect(isKana("ゖ")).toBe(true);
  });

  it("全角カタカナ(ァ〜ヺ)はtrue", () => {
    expect(isKana("ァ")).toBe(true);
    expect(isKana("ア")).toBe(true);
    expect(isKana("ン")).toBe(true);
    expect(isKana("ヺ")).toBe(true);
  });

  it("半角カタカナもtrue", () => {
    expect(isKana("ｱ")).toBe(true);
    expect(isKana("ｶ")).toBe(true);
    expect(isKana("ﾝ")).toBe(true);
  });

  it("長音記号(ー ｰ)はfalse", () => {
    expect(isKana("ー")).toBe(false);
    expect(isKana("ｰ")).toBe(false);
  });

  it("結合文字・半角スペーシングマークはfalse", () => {
    expect(isKana("゙")).toBe(false);
    expect(isKana("゚")).toBe(false);
    expect(isKana("ﾞ")).toBe(false);
    expect(isKana("ﾟ")).toBe(false);
  });

  it("英字・数字・記号・漢字はfalse", () => {
    expect(isKana("a")).toBe(false);
    expect(isKana("1")).toBe(false);
    expect(isKana("、")).toBe(false);
    expect(isKana("一")).toBe(false);
  });
});
