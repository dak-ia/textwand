import { commaToDotFullwidth, commaToDotHalfwidth, dotToCommaFullwidth, dotToCommaHalfwidth } from "./commaDot";

describe("commaToDotFullwidth", () => {
  it("全角カンマを読点に変換する", () => {
    expect(commaToDotFullwidth("あ，い")).toBe("あ、い");
  });

  it("既定では桁区切りのカンマも変換する", () => {
    expect(commaToDotFullwidth("1，000")).toBe("1、000");
  });

  it("escapeDigitがtrueなら桁区切りのカンマは保持する", () => {
    expect(commaToDotFullwidth("1，000", true)).toBe("1，000");
  });

  it("escapeDigitがtrueなら全角数字の桁区切りも保持する", () => {
    expect(commaToDotFullwidth("１，０００，０００", true)).toBe("１，０００，０００");
  });

  it("escapeDigitがtrueでも3桁区切りでないカンマは変換する", () => {
    expect(commaToDotFullwidth("1，23", true)).toBe("1、23");
  });

  it("通常カンマと桁区切りが混在しても通常カンマだけ変換する", () => {
    expect(commaToDotFullwidth("あ，い，1，000", true)).toBe("あ、い、1，000");
  });
});

describe("commaToDotHalfwidth", () => {
  it("半角カンマを読点に変換する", () => {
    expect(commaToDotHalfwidth("あ,い")).toBe("あ、い");
  });

  it("escapeDigitがtrueなら桁区切りのカンマは保持する", () => {
    expect(commaToDotHalfwidth("1,000,000", true)).toBe("1,000,000");
  });

  it("escapeDigitがtrueでも3桁区切りでないカンマは変換する", () => {
    expect(commaToDotHalfwidth("1,23", true)).toBe("1、23");
  });

  it("既定では桁区切りのカンマも変換する", () => {
    expect(commaToDotHalfwidth("1,000")).toBe("1、000");
  });

  it("通常カンマと桁区切りが混在しても通常カンマだけ変換する", () => {
    expect(commaToDotHalfwidth("あ,い,1,000", true)).toBe("あ、い、1,000");
  });
});

describe("dotToCommaFullwidth", () => {
  it("読点を全角カンマに変換する", () => {
    expect(dotToCommaFullwidth("あ、い")).toBe("あ，い");
  });
});

describe("dotToCommaHalfwidth", () => {
  it("読点を半角カンマに変換する", () => {
    expect(dotToCommaHalfwidth("あ、い")).toBe("あ,い");
  });
});
