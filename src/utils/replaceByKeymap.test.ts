import { replaceByKeymap } from "./replaceByKeymap";

describe("replaceByKeymap", () => {
  it("fromKeymap[i]をtoKeymap[i]に順番に全置換する", () => {
    expect(replaceByKeymap("あいう", ["あ", "い", "う"], ["ア", "イ", "ウ"])).toBe("アイウ");
  });

  it("同一文字をすべて置換する", () => {
    expect(replaceByKeymap("ああ", ["あ"], ["ア"])).toBe("アア");
  });

  it("該当なしの文字は変換しない", () => {
    expect(replaceByKeymap("xyz", ["あ"], ["ア"])).toBe("xyz");
  });

  it("空文字はそのまま返す", () => {
    expect(replaceByKeymap("", ["あ"], ["ア"])).toBe("");
  });

  it("toKeymapに対応がないキーは変換せず残す", () => {
    expect(replaceByKeymap("abc", ["a", "b", "c"], ["X"])).toBe("Xbc");
  });

  it("正規表現メタ文字を含むキーもリテラルとして扱う", () => {
    expect(replaceByKeymap("a.b(c", [".", "("], ["X", "Y"])).toBe("aXbYc");
  });
});
