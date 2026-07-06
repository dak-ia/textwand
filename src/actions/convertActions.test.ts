import { ConvertContext, convertActions } from "./convertActions";

const emptyContext: ConvertContext = { escapeDigit: false, before: "", after: "" };

describe("convertActions", () => {
  it("全data-actionが関数として登録されている", () => {
    const expectedNames = [
      "delFullSpace",
      "delHalfSpace",
      "delNewline",
      "delTab",
      "upperCase",
      "lowerCase",
      "katakanaToHiragana",
      "hiraganaToKatakana",
      "numberToFullwidth",
      "numberToHalfwidth",
      "alphabetToFullwidth",
      "alphabetToHalfwidth",
      "kanaToFullwidth",
      "kanaToHalfwidth",
      "spaceToFullwidth",
      "spaceToHalfwidth",
      "symbolToFullwidth",
      "symbolToHalfwidth",
      "periodToCircleFullwidth",
      "periodToCircleHalfwidth",
      "commaToDotFullwidth",
      "commaToDotHalfwidth",
      "circleToPeriodFullwidth",
      "circleToPeriodHalfwidth",
      "dotToCommaFullwidth",
      "dotToCommaHalfwidth",
      "textTransformation",
    ];
    expectedNames.forEach((name) => {
      expect(typeof convertActions[name]).toBe("function");
    });
    expect(Object.keys(convertActions)).toHaveLength(expectedNames.length);
  });

  it("upperCase は大文字化する", () => {
    expect(convertActions.upperCase("aBc", emptyContext)).toBe("ABC");
  });

  it("lowerCase は小文字化する", () => {
    expect(convertActions.lowerCase("aBc", emptyContext)).toBe("abc");
  });

  it("periodToCircleFullwidth はescapeDigitを渡す", () => {
    expect(convertActions.periodToCircleFullwidth("1．000", emptyContext)).toBe("1。000");
    expect(convertActions.periodToCircleFullwidth("1．000", { ...emptyContext, escapeDigit: true })).toBe("1．000");
  });

  it("periodToCircleHalfwidth はescapeDigitを渡す", () => {
    expect(convertActions.periodToCircleHalfwidth("1.000", emptyContext)).toBe("1。000");
    expect(convertActions.periodToCircleHalfwidth("1.000", { ...emptyContext, escapeDigit: true })).toBe("1.000");
  });

  it("commaToDotFullwidth はescapeDigitを渡す", () => {
    expect(convertActions.commaToDotFullwidth("1，000", emptyContext)).toBe("1、000");
    expect(convertActions.commaToDotFullwidth("1，000", { ...emptyContext, escapeDigit: true })).toBe("1，000");
  });

  it("commaToDotHalfwidth はescapeDigitを渡す", () => {
    expect(convertActions.commaToDotHalfwidth("1,000", emptyContext)).toBe("1、000");
    expect(convertActions.commaToDotHalfwidth("1,000", { ...emptyContext, escapeDigit: true })).toBe("1,000");
  });

  it("textTransformation はbefore/afterを渡す", () => {
    expect(
      convertActions.textTransformation("hello world", { ...emptyContext, before: "world", after: "universe" })
    ).toBe("hello universe");
  });
});
