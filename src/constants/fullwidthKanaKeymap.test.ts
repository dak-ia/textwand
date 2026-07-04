import { FULLWIDTH_KANA_KEYMAP } from "./fullwidthKanaKeymap";

describe("FULLWIDTH_KANA_KEYMAP", () => {
  it("84要素を持つ", () => {
    expect(FULLWIDTH_KANA_KEYMAP).toHaveLength(84);
  });

  it("要素が全て非空文字列である", () => {
    expect(FULLWIDTH_KANA_KEYMAP.every((e) => typeof e === "string" && e.length > 0)).toBe(true);
  });

  it("要素に重複がない", () => {
    expect(new Set(FULLWIDTH_KANA_KEYMAP).size).toBe(FULLWIDTH_KANA_KEYMAP.length);
  });

  it("特定インデックスの内容が期待通りである", () => {
    expect(FULLWIDTH_KANA_KEYMAP[0]).toBe("ァ");
    expect(FULLWIDTH_KANA_KEYMAP[8]).toBe("ッ");
    expect(FULLWIDTH_KANA_KEYMAP[11]).toBe("ガ");
    expect(FULLWIDTH_KANA_KEYMAP[36]).toBe("ア");
    expect(FULLWIDTH_KANA_KEYMAP.at(-1)).toBe("ヱ");
  });
});
