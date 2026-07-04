import {
  circleToPeriodFullwidth,
  circleToPeriodHalfwidth,
  periodToCircleFullwidth,
  periodToCircleHalfwidth,
} from "./periodCircle";

describe("periodToCircleFullwidth", () => {
  it("全角ピリオドを句点に変換する", () => {
    expect(periodToCircleFullwidth("あ．い")).toBe("あ。い");
  });

  it("既定では小数点のピリオドも変換する", () => {
    expect(periodToCircleFullwidth("３．１４")).toBe("３。１４");
  });

  it("escapeDigitがtrueなら小数点のピリオドは保持する", () => {
    expect(periodToCircleFullwidth("３．１４", true)).toBe("３．１４");
  });

  it("escapeDigitがtrueだと非数字と数字の間のピリオドは変換する", () => {
    expect(periodToCircleFullwidth("あ．１", true)).toBe("あ。１");
  });

  it("escapeDigitがtrueだと数字と非数字の間のピリオドは変換する", () => {
    expect(periodToCircleFullwidth("１．あ", true)).toBe("１。あ");
  });

  it("小数点と文末ピリオドが混在しても文末だけ変換する", () => {
    expect(periodToCircleFullwidth("３．１４と文末．", true)).toBe("３．１４と文末。");
  });
});

describe("periodToCircleHalfwidth", () => {
  it("半角ピリオドを句点に変換する", () => {
    expect(periodToCircleHalfwidth("あ.い")).toBe("あ。い");
  });

  it("escapeDigitがtrueなら小数点のピリオドは保持する", () => {
    expect(periodToCircleHalfwidth("3.14", true)).toBe("3.14");
  });

  it("escapeDigitがtrueだと非数字と数字の間のピリオドは変換する", () => {
    expect(periodToCircleHalfwidth("あ.1", true)).toBe("あ。1");
  });

  it("escapeDigitがtrueだと数字と非数字の間のピリオドは変換する", () => {
    expect(periodToCircleHalfwidth("1.あ", true)).toBe("1。あ");
  });

  it("小数点と文末ピリオドが混在しても文末だけ変換する", () => {
    expect(periodToCircleHalfwidth("3.14と文末.", true)).toBe("3.14と文末。");
  });
});

describe("circleToPeriodFullwidth", () => {
  it("句点を全角ピリオドに変換する", () => {
    expect(circleToPeriodFullwidth("あ。い")).toBe("あ．い");
  });
});

describe("circleToPeriodHalfwidth", () => {
  it("句点を半角ピリオドに変換する", () => {
    expect(circleToPeriodHalfwidth("あ。い")).toBe("あ.い");
  });
});
