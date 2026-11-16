import { EditorToken, joinEditorLines } from "./joinEditorLines";

const text = (value: string): EditorToken => ({ kind: "text", text: value });
const br: EditorToken = { kind: "lineBreak" };
const edge: EditorToken = { kind: "blockBoundary" };
const block = (...tokens: EditorToken[]): EditorToken[] => [edge, ...tokens, edge];
const lf = text("\n");

describe("joinEditorLines", () => {
  it("中身が無いときは空文字", () => {
    expect(joinEditorLines([])).toBe("");
  });

  it("全部消した後に残る空行のbrは改行として読まない", () => {
    expect(joinEditorLines([br])).toBe("");
    expect(joinEditorLines(block(br))).toBe("");
  });

  it("空の状態でEnterを押すと改行1つになる", () => {
    expect(joinEditorLines([...block(br), ...block(br)])).toBe("\n");
  });

  it("1行目の後にEnterで足した行は改行1つで区切る", () => {
    expect(joinEditorLines([text("aaaa"), ...block(text("bbb"))])).toBe("aaaa\nbbb");
  });

  it("末尾でEnterを押した直後は改行1つになる", () => {
    expect(joinEditorLines([text("abc"), ...block(br)])).toBe("abc\n");
  });

  it("行の間の空行は改行2つになる", () => {
    expect(joinEditorLines([...block(text("a")), ...block(br), ...block(text("b"))])).toBe("a\n\nb");
  });

  it("行末に残った空行用のbrは改行として読まない", () => {
    expect(joinEditorLines([...block(text("a"), br), ...block(text("b"))])).toBe("a\nb");
  });

  it("書き込んだ文字列を読み戻せる", () => {
    expect(joinEditorLines([text("a"), lf, text("b")])).toBe("a\nb");
    expect(joinEditorLines([text("a"), lf, lf])).toBe("a\n");
    expect(joinEditorLines([lf, lf])).toBe("\n");
    expect(joinEditorLines([lf, text("a")])).toBe("\na");
    expect(joinEditorLines([lf, lf, lf])).toBe("\n\n");
    expect(joinEditorLines([text("a"), lf, lf, lf])).toBe("a\n\n");
    expect(joinEditorLines([text("a"), lf, lf, text("b")])).toBe("a\n\nb");
  });

  it("br区切りの文字列を読める", () => {
    expect(joinEditorLines([text("a"), br, text("b")])).toBe("a\nb");
    expect(joinEditorLines([text("a"), br, br])).toBe("a\n");
    expect(joinEditorLines([br, br])).toBe("\n");
    expect(joinEditorLines([br, text("a")])).toBe("\na");
    expect(joinEditorLines([br, br, br])).toBe("\n\n");
    expect(joinEditorLines([text("a"), br, br, br])).toBe("a\n\n");
    expect(joinEditorLines([text("a"), br, br, text("b")])).toBe("a\n\nb");
  });

  it("文字列の中の改行はそのまま", () => {
    expect(joinEditorLines([text("x\ny")])).toBe("x\ny");
  });

  it("Shift+Enterで末尾に足される空行用の改行は読まない", () => {
    expect(joinEditorLines([text("abc"), lf, lf])).toBe("abc\n");
    expect(joinEditorLines([lf, lf])).toBe("\n");
  });

  it("改行文字の後に空行用のbrが続く形は改行1つになる", () => {
    expect(joinEditorLines([text("abc\n"), br])).toBe("abc\n");
    expect(joinEditorLines(block(text("abc\n"), br))).toBe("abc\n");
  });

  it("行の中で続くbrは空行として読む", () => {
    expect(joinEditorLines([...block(text("a"), br, br), ...block(text("b"))])).toBe("a\n\nb");
  });

  it("ブロックの末尾の改行は空行にならない", () => {
    expect(joinEditorLines([...block(text("a\n")), ...block(text("b"))])).toBe("a\nb");
    expect(joinEditorLines([text("abc\r\n")])).toBe("abc");
    expect(joinEditorLines([text("abc\r")])).toBe("abc");
  });

  it("CRLFと単独のCRは改行1つとして読む", () => {
    expect(joinEditorLines([text("a\r\nb")])).toBe("a\nb");
    expect(joinEditorLines([text("a\rb")])).toBe("a\nb");
    expect(joinEditorLines([text("a\r\nb\nc\rd")])).toBe("a\nb\nc\nd");
    expect(joinEditorLines([text("a\r"), text("\nb")])).toBe("a\nb");
    expect(joinEditorLines([text("a\r\n"), br, text("b")])).toBe("a\n\nb");
  });

  it("中身が空のテキストは行を作らない", () => {
    expect(joinEditorLines([text(""), text("xyz"), ...block(text(""))])).toBe("xyz");
    expect(joinEditorLines([...block(text("")), text("xyz"), ...block(text(""))])).toBe("xyz");
  });
});
