import { numberToFullwidth, numberToHalfwidth } from "./numberWidth";

describe("numberToFullwidth", () => {
  it("半角数字を全角に変換する", () => {
    expect(numberToFullwidth("0123456789")).toBe("０１２３４５６７８９");
  });

  it("英字・記号は変換しない", () => {
    expect(numberToFullwidth("a1!")).toBe("a１!");
  });

  it("数字と文字が混在しても数字だけ変換する", () => {
    expect(numberToFullwidth("あ1か2A3")).toBe("あ１か２A３");
  });
});

describe("numberToHalfwidth", () => {
  it("全角数字を半角に変換する", () => {
    expect(numberToHalfwidth("０１２３４５６７８９")).toBe("0123456789");
  });

  it("対象外の文字はそのまま返す", () => {
    expect(numberToHalfwidth("あ１!")).toBe("あ1!");
  });

  it("全角数字と文字が混在しても数字だけ変換する", () => {
    expect(numberToHalfwidth("あ１か２Ａ３")).toBe("あ1か2Ａ3");
  });
});
