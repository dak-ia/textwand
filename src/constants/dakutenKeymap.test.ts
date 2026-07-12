import { DAKUTEN_APPLIED, DAKUTEN_BASE, HANDAKUTEN_APPLIED, HANDAKUTEN_BASE } from "./dakutenKeymap";

describe("DAKUTEN_BASE / DAKUTEN_APPLIED", () => {
  it("同じ長さで対応する", () => {
    expect(DAKUTEN_BASE).toHaveLength(DAKUTEN_APPLIED.length);
  });

  it("ひらがな21+全角カタカナ25+半角カタカナ23で69要素", () => {
    expect(DAKUTEN_BASE).toHaveLength(69);
  });

  it("BASEに重複がない", () => {
    expect(new Set(DAKUTEN_BASE).size).toBe(DAKUTEN_BASE.length);
  });

  it("APPLIEDに重複がない", () => {
    expect(new Set(DAKUTEN_APPLIED).size).toBe(DAKUTEN_APPLIED.length);
  });

  it("特定インデックスの対応が期待通り", () => {
    const map = new Map<string, string>(DAKUTEN_BASE.map((k, i) => [k, DAKUTEN_APPLIED[i]]));
    expect(map.get("か")).toBe("が");
    expect(map.get("は")).toBe("ば");
    expect(map.get("う")).toBe("ゔ");
    expect(map.get("カ")).toBe("ガ");
    expect(map.get("ハ")).toBe("バ");
    expect(map.get("ウ")).toBe("ヴ");
    expect(map.get("ワ")).toBe("ヷ");
    expect(map.get("ヲ")).toBe("ヺ");
    expect(map.get("ｶ")).toBe("ｶﾞ");
    expect(map.get("ﾊ")).toBe("ﾊﾞ");
    expect(map.get("ｳ")).toBe("ｳﾞ");
    expect(map.get("ﾜ")).toBe("ﾜﾞ");
    expect(map.get("ｦ")).toBe("ｦﾞ");
  });
});

describe("HANDAKUTEN_BASE / HANDAKUTEN_APPLIED", () => {
  it("同じ長さで対応する", () => {
    expect(HANDAKUTEN_BASE).toHaveLength(HANDAKUTEN_APPLIED.length);
  });

  it("は行ひらがな5+全角カタカナ5+半角カタカナ5で15要素", () => {
    expect(HANDAKUTEN_BASE).toHaveLength(15);
  });

  it("BASEに重複がない", () => {
    expect(new Set(HANDAKUTEN_BASE).size).toBe(HANDAKUTEN_BASE.length);
  });

  it("APPLIEDに重複がない", () => {
    expect(new Set(HANDAKUTEN_APPLIED).size).toBe(HANDAKUTEN_APPLIED.length);
  });

  it("特定インデックスの対応が期待通り", () => {
    const map = new Map<string, string>(HANDAKUTEN_BASE.map((k, i) => [k, HANDAKUTEN_APPLIED[i]]));
    expect(map.get("は")).toBe("ぱ");
    expect(map.get("ふ")).toBe("ぷ");
    expect(map.get("ハ")).toBe("パ");
    expect(map.get("ホ")).toBe("ポ");
    expect(map.get("ﾊ")).toBe("ﾊﾟ");
    expect(map.get("ﾎ")).toBe("ﾎﾟ");
  });
});
