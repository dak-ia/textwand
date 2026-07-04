import { delFullSpace, delHalfSpace, delNewline, delTab } from "./deleteWhitespace";

describe("delHalfSpace", () => {
  it("半角スペースを削除する", () => {
    expect(delHalfSpace("a b c")).toBe("abc");
  });

  it("ノーブレークスペースも削除する", () => {
    expect(delHalfSpace("a b")).toBe("ab");
  });

  it("全角スペースは対象外でそのまま返す", () => {
    expect(delHalfSpace("a　b")).toBe("a　b");
  });

  it("他の空白と混在しても半角スペースだけ削除する", () => {
    expect(delHalfSpace("a b\tc")).toBe("ab\tc");
  });
});

describe("delFullSpace", () => {
  it("全角スペースを削除する", () => {
    expect(delFullSpace("a　b　c")).toBe("abc");
  });

  it("半角スペースは対象外でそのまま返す", () => {
    expect(delFullSpace("a b")).toBe("a b");
  });

  it("他の空白と混在しても全角スペースだけ削除する", () => {
    expect(delFullSpace("a　b c")).toBe("ab c");
  });
});

describe("delNewline", () => {
  it("LF・CRLF・CRを削除する", () => {
    expect(delNewline("a\nb\r\nc\rd")).toBe("abcd");
  });

  it("VT・FF・NEL・LS・PSを削除する", () => {
    const sep = String.fromCharCode(0x000b, 0x000c, 0x0085, 0x2028, 0x2029);
    expect(delNewline("a" + sep + "b")).toBe("ab");
  });

  it("タブは対象外でそのまま返す", () => {
    expect(delNewline("a\tb")).toBe("a\tb");
  });

  it("他の空白と混在しても改行だけ削除する", () => {
    expect(delNewline("a\nb c\td")).toBe("ab c\td");
  });
});

describe("delTab", () => {
  it("タブを削除する", () => {
    expect(delTab("a\tb\tc")).toBe("abc");
  });

  it("スペース・改行は対象外でそのまま返す", () => {
    expect(delTab("a b\nc")).toBe("a b\nc");
  });

  it("他の空白と混在してもタブだけ削除する", () => {
    expect(delTab("a\tb c\nd")).toBe("ab c\nd");
  });
});
