import { HIRAGANA_KEYMAP } from "./hiraganaKeymap";

describe("HIRAGANA_KEYMAP", () => {
  it("84要素を持つ", () => {
    expect(HIRAGANA_KEYMAP).toHaveLength(84);
  });

  it("要素が全て非空文字列である", () => {
    expect(HIRAGANA_KEYMAP.every((e) => typeof e === "string" && e.length > 0)).toBe(true);
  });

  it("要素に重複がない", () => {
    expect(new Set(HIRAGANA_KEYMAP).size).toBe(HIRAGANA_KEYMAP.length);
  });

  it("特定インデックスの内容が期待通りである", () => {
    expect(HIRAGANA_KEYMAP[0]).toBe("ぁ");
    expect(HIRAGANA_KEYMAP[8]).toBe("っ");
    expect(HIRAGANA_KEYMAP[11]).toBe("が");
    expect(HIRAGANA_KEYMAP[36]).toBe("あ");
    expect(HIRAGANA_KEYMAP.at(-1)).toBe("ゑ");
  });
});
