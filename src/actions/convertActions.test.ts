import { ConvertContext, convertActions } from "./convertActions";

const CD = "\u3099";
const CH = "\u309A";

const emptyContext: ConvertContext = {
  escapeDigit: false,
  combiningOnly: false,
  before: "",
  after: "",
};

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
      "addDakuten",
      "addHandakuten",
      "removeDakuten",
      "removeHandakuten",
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

  it("upperCaseは大文字化する", () => {
    expect(convertActions.upperCase("aBc", emptyContext)).toBe("ABC");
  });

  it("lowerCaseは小文字化する", () => {
    expect(convertActions.lowerCase("aBc", emptyContext)).toBe("abc");
  });

  it("periodToCircleFullwidthはescapeDigitを渡す", () => {
    expect(convertActions.periodToCircleFullwidth("1．000", emptyContext)).toBe("1。000");
    expect(convertActions.periodToCircleFullwidth("1．000", { ...emptyContext, escapeDigit: true })).toBe("1．000");
  });

  it("periodToCircleHalfwidthはescapeDigitを渡す", () => {
    expect(convertActions.periodToCircleHalfwidth("1.000", emptyContext)).toBe("1。000");
    expect(convertActions.periodToCircleHalfwidth("1.000", { ...emptyContext, escapeDigit: true })).toBe("1.000");
  });

  it("commaToDotFullwidthはescapeDigitを渡す", () => {
    expect(convertActions.commaToDotFullwidth("1，000", emptyContext)).toBe("1、000");
    expect(convertActions.commaToDotFullwidth("1，000", { ...emptyContext, escapeDigit: true })).toBe("1，000");
  });

  it("commaToDotHalfwidthはescapeDigitを渡す", () => {
    expect(convertActions.commaToDotHalfwidth("1,000", emptyContext)).toBe("1、000");
    expect(convertActions.commaToDotHalfwidth("1,000", { ...emptyContext, escapeDigit: true })).toBe("1,000");
  });

  it("addDakutenはcombiningOnlyを渡す", () => {
    expect(convertActions.addDakuten("か", emptyContext)).toBe("が");
    expect(convertActions.addDakuten("か", { ...emptyContext, combiningOnly: true })).toBe(`か${CD}`);
  });

  it("addHandakutenはcombiningOnlyを渡す", () => {
    expect(convertActions.addHandakuten("は", emptyContext)).toBe("ぱ");
    expect(convertActions.addHandakuten("は", { ...emptyContext, combiningOnly: true })).toBe(`は${CH}`);
  });

  it("removeDakutenはcombiningOnlyを渡す", () => {
    expect(convertActions.removeDakuten("が", emptyContext)).toBe("か");
    expect(convertActions.removeDakuten("が", { ...emptyContext, combiningOnly: true })).toBe("が");
  });

  it("removeHandakutenはcombiningOnlyを渡す", () => {
    expect(convertActions.removeHandakuten("ぱ", emptyContext)).toBe("は");
    expect(convertActions.removeHandakuten("ぱ", { ...emptyContext, combiningOnly: true })).toBe("ぱ");
  });

  it("textTransformationはbefore/afterを渡す", () => {
    expect(
      convertActions.textTransformation("hello world", { ...emptyContext, before: "world", after: "universe" })
    ).toBe("hello universe");
  });
});
