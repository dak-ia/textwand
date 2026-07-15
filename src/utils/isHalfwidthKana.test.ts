import { isHalfwidthKana } from "./isHalfwidthKana";

describe("isHalfwidthKana", () => {
  it("半角カタカナ本体(ｱ〜ﾝ)はtrue", () => {
    expect(isHalfwidthKana("ｱ")).toBe(true);
    expect(isHalfwidthKana("ｶ")).toBe(true);
    expect(isHalfwidthKana("ﾝ")).toBe(true);
  });

  it("ｦ・小書き・ｯもtrue", () => {
    expect(isHalfwidthKana("ｦ")).toBe(true);
    expect(isHalfwidthKana("ｧ")).toBe(true);
    expect(isHalfwidthKana("ｯ")).toBe(true);
  });

  it("ｰ(長音)は含めないのでfalse", () => {
    expect(isHalfwidthKana("ｰ")).toBe(false);
  });

  it("半角の濁点/半濁点マーク(ﾞ ﾟ)はfalse", () => {
    expect(isHalfwidthKana("ﾞ")).toBe(false);
    expect(isHalfwidthKana("ﾟ")).toBe(false);
  });

  it("全角かな・英字はfalse", () => {
    expect(isHalfwidthKana("あ")).toBe(false);
    expect(isHalfwidthKana("ア")).toBe(false);
    expect(isHalfwidthKana("a")).toBe(false);
    expect(isHalfwidthKana(" ")).toBe(false);
  });
});
