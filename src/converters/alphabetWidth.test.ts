import { alphabetToFullwidth, alphabetToHalfwidth } from "./alphabetWidth";

describe("alphabetToFullwidth", () => {
  it("半角英字の大文字・小文字を全角に変換する", () => {
    expect(alphabetToFullwidth("ABCxyz")).toBe("ＡＢＣｘｙｚ");
  });

  it("数字・記号は変換しない", () => {
    expect(alphabetToFullwidth("A1!")).toBe("Ａ1!");
  });

  it("英字と他の文字が混在しても英字だけ変換する", () => {
    expect(alphabetToFullwidth("aか1B")).toBe("ａか1Ｂ");
  });
});

describe("alphabetToHalfwidth", () => {
  it("全角英字の大文字・小文字を半角に変換する", () => {
    expect(alphabetToHalfwidth("ＡＢＣｘｙｚ")).toBe("ABCxyz");
  });

  it("対象外の文字はそのまま返す", () => {
    expect(alphabetToHalfwidth("Ａ1!")).toBe("A1!");
  });

  it("全角英字と他の文字が混在しても英字だけ変換する", () => {
    expect(alphabetToHalfwidth("Ａか1ｂ")).toBe("Aか1b");
  });
});
