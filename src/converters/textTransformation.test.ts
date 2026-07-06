import { textTransformation } from "./textTransformation";

describe("textTransformation", () => {
  it("一致した部分文字列を置換する", () => {
    expect(textTransformation("foobar", "foo", "baz")).toBe("bazbar");
  });

  it("一致する箇所をすべて置換する", () => {
    expect(textTransformation("aaa", "a", "b")).toBe("bbb");
  });

  it("正規表現メタ文字(.)をリテラルとして扱う", () => {
    expect(textTransformation("a.b.c", ".", "X")).toBe("aXbXc");
  });

  it("正規表現メタ文字(+)をリテラルとして扱う", () => {
    expect(textTransformation("1+1", "+", "p")).toBe("1p1");
  });

  it("正規表現メタ文字の括弧をリテラルとして扱う", () => {
    expect(textTransformation("a(b)c", "(b)", "X")).toBe("aXc");
  });

  it("バックスラッシュをリテラルとして扱う", () => {
    expect(textTransformation("a\\b", "\\", "/")).toBe("a/b");
  });

  it("afterの$&をリテラルとして挿入する", () => {
    expect(textTransformation("ab", "a", "[$&]")).toBe("[$&]b");
  });

  it("afterの$をリテラルとして挿入する", () => {
    expect(textTransformation("amount", "amount", "$100")).toBe("$100");
  });

  it("afterが空なら一致部分を削除する", () => {
    expect(textTransformation("a-b-c", "-", "")).toBe("abc");
  });

  it("日本語を置換する", () => {
    expect(textTransformation("わたしはわたし", "わたし", "私")).toBe("私は私");
  });

  it("一致しなければそのまま返す", () => {
    expect(textTransformation("abc", "x", "y")).toBe("abc");
  });
});
