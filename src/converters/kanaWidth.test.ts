import { kanaToFullwidth, kanaToHalfwidth } from "./kanaWidth";

describe("kanaToFullwidth", () => {
  it("半角カナを全角カナに変換する", () => {
    expect(kanaToFullwidth("ｱｲｳｴｵ")).toBe("アイウエオ");
  });

  it("濁点付きを合成して変換する", () => {
    expect(kanaToFullwidth("ｶﾞｷﾞﾊﾟ")).toBe("ガギパ");
  });

  it("ｳﾞをヴに変換する", () => {
    expect(kanaToFullwidth("ｳﾞ")).toBe("ヴ");
  });

  it("濁点なし単体を変換する", () => {
    expect(kanaToFullwidth("ｶ")).toBe("カ");
  });

  it("対象外の文字はそのまま返す", () => {
    expect(kanaToFullwidth("ｱABC")).toBe("アABC");
  });

  it("半角カナと他の文字が混在してもカナだけ変換する", () => {
    expect(kanaToFullwidth("ｱあA1ｶﾞ")).toBe("アあA1ガ");
  });
});

describe("kanaToHalfwidth", () => {
  it("全角カナを半角カナに変換する", () => {
    expect(kanaToHalfwidth("アイウエオ")).toBe("ｱｲｳｴｵ");
  });

  it("濁音を濁点付き半角に分解する", () => {
    expect(kanaToHalfwidth("ガパヴ")).toBe("ｶﾞﾊﾟｳﾞ");
  });

  it("対象外の文字はそのまま返す", () => {
    expect(kanaToHalfwidth("アABC")).toBe("ｱABC");
  });

  it("全角カナと他の文字が混在してもカナだけ変換する", () => {
    expect(kanaToHalfwidth("アあA1ガ")).toBe("ｱあA1ｶﾞ");
  });

  it("半角に対応がないヰ・ヱは変換せず残す", () => {
    expect(kanaToHalfwidth("アヰヱン")).toBe("ｱヰヱﾝ");
  });
});
