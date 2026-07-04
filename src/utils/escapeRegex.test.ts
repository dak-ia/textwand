import { escapeRegex } from "./escapeRegex";

describe("escapeRegex", () => {
  it("正規表現メタ文字の前にバックスラッシュを付ける", () => {
    expect(escapeRegex("a.c")).toBe("a\\.c");
    expect(escapeRegex("(x)")).toBe("\\(x\\)");
  });

  it("バックスラッシュ自体もエスケープする", () => {
    expect(escapeRegex("a\\b")).toBe("a\\\\b");
  });

  it("メタ文字でない文字はそのまま返す", () => {
    expect(escapeRegex("abcあ1")).toBe("abcあ1");
  });

  it("エスケープ後はメタ文字がリテラルとして一致する", () => {
    expect(new RegExp(escapeRegex("a.b(c)")).test("a.b(c)")).toBe(true);
    expect(new RegExp(escapeRegex("a.b")).test("axb")).toBe(false);
  });
});
