import { HALFWIDTH_KANA_KEYMAP } from "./halfwidthKanaKeymap";

describe("HALFWIDTH_KANA_KEYMAP", () => {
  it("82要素を持つ(ヰ/ヱの半角対応が存在しないため全角より2つ少ない)", () => {
    expect(HALFWIDTH_KANA_KEYMAP).toHaveLength(82);
  });

  it("要素が全て非空文字列である", () => {
    expect(HALFWIDTH_KANA_KEYMAP.every((e) => typeof e === "string" && e.length > 0)).toBe(true);
  });

  it("要素に重複がない", () => {
    expect(new Set(HALFWIDTH_KANA_KEYMAP).size).toBe(HALFWIDTH_KANA_KEYMAP.length);
  });

  it("特定インデックスの内容が期待通りである", () => {
    expect(HALFWIDTH_KANA_KEYMAP[0]).toBe("ｧ");
    expect(HALFWIDTH_KANA_KEYMAP[8]).toBe("ｯ");
    expect(HALFWIDTH_KANA_KEYMAP[11]).toBe("ｶﾞ");
    expect(HALFWIDTH_KANA_KEYMAP[36]).toBe("ｱ");
    expect(HALFWIDTH_KANA_KEYMAP.at(-1)).toBe("ﾝ");
  });
});
