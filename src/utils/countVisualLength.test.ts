import { countVisualLength } from "./countVisualLength";

describe("countVisualLength", () => {
  it("空文字は全指標が0", () => {
    expect(countVisualLength("")).toEqual({
      TextWithoutLineBreak: 0,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("半角ASCIIのみは全角カウントが0になる", () => {
    expect(countVisualLength("abc")).toEqual({
      TextWithoutLineBreak: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("全角のみは全指標が同じ値になる", () => {
    expect(countVisualLength("あいう")).toEqual({
      TextWithoutLineBreak: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
  });

  it("半角/全角/空白/改行が混在すると各指標が意図通り差分を出す", () => {
    // eslint-disable-next-line no-irregular-whitespace
    // "a あ　い\n" は 半角a + 半角空白 + あ + 全角空白 + い + 改行
    expect(countVisualLength("a あ　い\n")).toEqual({
      TextWithoutLineBreak: 5,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
  });

  it("ZWJ絵文字は見た目上の1文字としてカウントする", () => {
    // 👨‍👨‍👦‍👦 は Intl.Segmenter によって1つのgrapheme clusterとして扱われる
    expect(countVisualLength("👨‍👨‍👦‍👦")).toEqual({
      TextWithoutLineBreak: 1,
      TextWithoutWhiteSpace: 1,
      TextOnlyFullWidth: 1,
      TextOnlyFullwidthWithoutWhiteSpace: 1,
    });
  });
});
