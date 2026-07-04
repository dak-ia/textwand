import { spaceToFullwidth, spaceToHalfwidth } from "./spaceWidth";

describe("spaceToFullwidth", () => {
  it("半角スペースを全角スペースに変換する", () => {
    expect(spaceToFullwidth("a b")).toBe("a　b");
  });

  it("ノーブレークスペースも全角スペースに変換する", () => {
    expect(spaceToFullwidth(" ")).toBe("　");
  });

  it("スペースがなければそのまま返す", () => {
    expect(spaceToFullwidth("ab")).toBe("ab");
  });

  it("他の文字と混在しても半角スペースだけ変換する", () => {
    expect(spaceToFullwidth("1a b")).toBe("1a　b");
  });
});

describe("spaceToHalfwidth", () => {
  it("全角スペースを半角スペースに変換する", () => {
    expect(spaceToHalfwidth("a　b")).toBe("a b");
  });

  it("全角スペースがなければそのまま返す", () => {
    expect(spaceToHalfwidth("ab")).toBe("ab");
  });

  it("他の文字と混在しても全角スペースだけ変換する", () => {
    expect(spaceToHalfwidth("1a　b")).toBe("1a b");
  });
});
