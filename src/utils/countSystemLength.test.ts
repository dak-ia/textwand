import { countSystemLength } from "./countSystemLength";

describe("countSystemLength", () => {
  it("空文字は全指標が0", () => {
    expect(countSystemLength("")).toEqual({
      TextWithoutLineBreak: 0,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("半角ASCIIのみは全角カウントが0になる", () => {
    expect(countSystemLength("abc")).toEqual({
      TextWithoutLineBreak: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("全角のみは全指標が同じ値になる", () => {
    expect(countSystemLength("あいう")).toEqual({
      TextWithoutLineBreak: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
  });

  it("半角/全角/空白/改行が混在すると各指標が意図通り差分を出す", () => {
    // eslint-disable-next-line no-irregular-whitespace
    // "a あ　い\n" は 半角a + 半角空白 + あ + 全角空白 + い + 改行
    expect(countSystemLength("a あ　い\n")).toEqual({
      TextWithoutLineBreak: 5, // 改行のみ除去
      TextWithoutWhiteSpace: 3, // 全空白除去 -> aあい
      // eslint-disable-next-line no-irregular-whitespace
      TextOnlyFullWidth: 3, // 半角と半角空白のみ除去、全角空白は残す -> あ　い
      TextOnlyFullwidthWithoutWhiteSpace: 2, // 全角空白も含めた全空白と半角を除去 -> あい
    });
  });

  it("ZWJ絵文字はコードポイント単位でカウントする", () => {
    // 👨‍👨‍👦‍👦 は 4絵文字 + 3ZWJ = 7コードポイント。ASCIIでも半角カナでもないので全角扱い
    expect(countSystemLength("👨‍👨‍👦‍👦")).toEqual({
      TextWithoutLineBreak: 7,
      TextWithoutWhiteSpace: 7,
      TextOnlyFullWidth: 7,
      TextOnlyFullwidthWithoutWhiteSpace: 7,
    });
  });
});
