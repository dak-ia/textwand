import { symbolToFullwidth, symbolToHalfwidth } from "./symbolWidth";

describe("symbolToFullwidth", () => {
  it("ASCII記号の各範囲の境界を全角に変換する", () => {
    expect(symbolToFullwidth("!/:@[`{~")).toBe("！／：＠［｀｛～");
  });

  it("個別マッピングの記号を全角に変換する", () => {
    expect(symbolToFullwidth("¥⦅⦆･")).toBe("￥｟｠・");
  });

  it("英数字・かなは対象外でそのまま返す", () => {
    expect(symbolToFullwidth("A1あ")).toBe("A1あ");
  });

  it("記号と他の文字が混在しても記号だけ変換する", () => {
    expect(symbolToFullwidth("a!1あ")).toBe("a！1あ");
  });

  it("矢印・罫線の個別マッピングを全角に変換する", () => {
    expect(symbolToFullwidth("￨￩￪￫￬￭￮")).toBe("│←↑→↓■○");
  });
});

describe("symbolToHalfwidth", () => {
  it("全角記号の各範囲の境界を半角に変換する", () => {
    expect(symbolToHalfwidth("！／：＠［｀｛～")).toBe("!/:@[`{~");
  });

  it("個別マッピングの記号を半角に変換する", () => {
    expect(symbolToHalfwidth("￥｟｠・")).toBe("¥⦅⦆･");
  });

  it("英数字・かなは対象外でそのまま返す", () => {
    expect(symbolToHalfwidth("A1あ")).toBe("A1あ");
  });

  it("記号と他の文字が混在しても記号だけ変換する", () => {
    expect(symbolToHalfwidth("a！1あ")).toBe("a!1あ");
  });

  it("矢印・罫線の個別マッピングを半角に変換する", () => {
    expect(symbolToHalfwidth("│←↑→↓■○")).toBe("￨￩￪￫￬￭￮");
  });
});
