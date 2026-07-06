import {
  alphabetToFullwidth,
  commaToDotFullwidth,
  delFullSpace,
  hiraganaToKatakana,
  kanaToFullwidth,
  numberToFullwidth,
  periodToCircleFullwidth,
  spaceToFullwidth,
  symbolToFullwidth,
  textTransformation,
} from ".";

describe("converters barrel", () => {
  it("全converterをバレル経由でimportできる", () => {
    expect(typeof alphabetToFullwidth).toBe("function");
    expect(typeof commaToDotFullwidth).toBe("function");
    expect(typeof delFullSpace).toBe("function");
    expect(typeof hiraganaToKatakana).toBe("function");
    expect(typeof kanaToFullwidth).toBe("function");
    expect(typeof numberToFullwidth).toBe("function");
    expect(typeof periodToCircleFullwidth).toBe("function");
    expect(typeof spaceToFullwidth).toBe("function");
    expect(typeof symbolToFullwidth).toBe("function");
    expect(typeof textTransformation).toBe("function");
  });
});
