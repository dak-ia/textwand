import { hiraganaToKatakana, katakanaToHiragana } from "./kana";

describe("katakanaToHiragana", () => {
  it("全角カタカナをひらがなに変換する", () => {
    expect(katakanaToHiragana("アイウエオ")).toBe("あいうえお");
  });

  it("濁音・半濁音・ヴを変換する", () => {
    expect(katakanaToHiragana("ガパヴ")).toBe("がぱゔ");
  });

  it("小書き・促音は変換し長音はそのまま", () => {
    expect(katakanaToHiragana("ァッー")).toBe("ぁっー");
  });

  it("対象外の文字はそのまま返す", () => {
    expect(katakanaToHiragana("アはA1")).toBe("あはA1");
  });
});

describe("hiraganaToKatakana", () => {
  it("ひらがなを全角カタカナに変換する", () => {
    expect(hiraganaToKatakana("あいうえお")).toBe("アイウエオ");
  });

  it("濁音・半濁音・ゔを変換する", () => {
    expect(hiraganaToKatakana("がぱゔ")).toBe("ガパヴ");
  });

  it("小書き・促音を変換する", () => {
    expect(hiraganaToKatakana("ぁっ")).toBe("ァッ");
  });

  it("対象外の文字はそのまま返す", () => {
    expect(hiraganaToKatakana("あA1")).toBe("アA1");
  });
});
