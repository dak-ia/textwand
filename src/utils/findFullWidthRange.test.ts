import { findFullWidthRange } from "./findFullWidthRange";

describe("findFullWidthRange", () => {
  it("全角文字の連なりを1区間として返す", () => {
    expect(findFullWidthRange("あいう")).toEqual([{ start: 0, end: 3 }]);
  });

  it("半角ASCIIしかなければ空配列", () => {
    expect(findFullWidthRange("abc 123")).toEqual([]);
  });

  it("半角カナと半角空白/NBSPは全角に含めない", () => {
    expect(findFullWidthRange("ｱｲｳ x y")).toEqual([]);
  });

  it("半角と全角が混じるとき全角の部分だけ拾う", () => {
    expect(findFullWidthRange("aあb")).toEqual([{ start: 1, end: 2 }]);
  });

  it("全角の連なりが複数箇所あればそれぞれ返す", () => {
    expect(findFullWidthRange("aあいbうc")).toEqual([
      { start: 1, end: 3 },
      { start: 4, end: 5 },
    ]);
  });

  it("半角空白は全角の連なりを区切る", () => {
    expect(findFullWidthRange("あ い")).toEqual([
      { start: 0, end: 1 },
      { start: 2, end: 3 },
    ]);
  });

  it("全角空白は全角として拾う", () => {
    expect(findFullWidthRange("あ　い")).toEqual([{ start: 0, end: 3 }]);
  });

  it("空文字は空配列", () => {
    expect(findFullWidthRange("")).toEqual([]);
  });
});
