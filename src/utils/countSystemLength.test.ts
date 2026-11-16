import { countSystemLength } from "./countSystemLength";

const NEL = String.fromCharCode(0x0085);
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);

describe("countSystemLength", () => {
  it("空文字は全指標が0", () => {
    expect(countSystemLength("")).toEqual({
      TextWithWhiteSpace: 0,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("半角ASCIIのみは全角カウントが0になる", () => {
    expect(countSystemLength("abc")).toEqual({
      TextWithWhiteSpace: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("全角のみは全指標が同じ値になる", () => {
    expect(countSystemLength("あいう")).toEqual({
      TextWithWhiteSpace: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
  });

  it("半角/全角/空白/改行が混在すると各指標が意図通り差分を出す", () => {
    // eslint-disable-next-line no-irregular-whitespace
    // "a あ　い\n" は 半角a + 半角空白 + あ + 全角空白 + い + 改行
    expect(countSystemLength("a あ　い\n")).toEqual({
      TextWithWhiteSpace: 5, // 改行のみ除去
      TextWithoutWhiteSpace: 3, // 全空白除去 -> aあい
      // eslint-disable-next-line no-irregular-whitespace
      TextOnlyFullWidth: 3, // 半角と半角空白のみ除去、全角空白は残す -> あ　い
      TextOnlyFullwidthWithoutWhiteSpace: 2, // 全角空白も含めた全空白と半角を除去 -> あい
    });
  });

  it("改行を数えるかで変わるのは空白込みの数だけ", () => {
    // eslint-disable-next-line no-irregular-whitespace
    // "あ　い\n\tう" は あ + 全角空白 + い + 改行 + タブ + う
    expect(countSystemLength("あ　い\n\tう")).toEqual({
      TextWithWhiteSpace: 5,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 4,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
    expect(countSystemLength("あ　い\n\tう", true)).toEqual({
      TextWithWhiteSpace: 6,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 4,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
  });

  it("LSもCR・LFと同じく改行として扱う", () => {
    expect(countSystemLength("あ" + LS + "い\n")).toEqual({
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 2,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
    expect(countSystemLength("あ" + LS + "い\n", true)).toEqual({
      TextWithWhiteSpace: 4,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 2,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
  });

  it("VT・FF・NEL・PSもCR・LFと同じく改行として扱う", () => {
    const text = "a\vあ" + NEL + "　い" + PS + "\f";
    expect(countSystemLength(text)).toEqual({
      TextWithWhiteSpace: 4,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
    expect(countSystemLength(text, true)).toEqual({
      TextWithWhiteSpace: 8,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
  });

  it("改行を数えないときはCRLFも除く", () => {
    expect(countSystemLength("a\r\nb").TextWithWhiteSpace).toBe(2);
  });

  it("改行を数えるときCRLFはコードポイント単位で2文字に数える", () => {
    expect(countSystemLength("a\r\nb", true).TextWithWhiteSpace).toBe(4);
  });

  it("単独のCRも改行として扱う", () => {
    expect(countSystemLength("a\rb").TextWithWhiteSpace).toBe(2);
    expect(countSystemLength("a\rb", true).TextWithWhiteSpace).toBe(3);
  });

  it("改行だけの入力は改行を数えるときだけ空白込みに入る", () => {
    expect(countSystemLength("\n\n")).toEqual({
      TextWithWhiteSpace: 0,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
    expect(countSystemLength("\n\n", true)).toEqual({
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("ZWJ絵文字はコードポイント単位でカウントする", () => {
    // 👨‍👨‍👦‍👦 は 4絵文字 + 3ZWJ = 7コードポイント。ASCIIでも半角カナでもないので全角扱い
    expect(countSystemLength("👨‍👨‍👦‍👦")).toEqual({
      TextWithWhiteSpace: 7,
      TextWithoutWhiteSpace: 7,
      TextOnlyFullWidth: 7,
      TextOnlyFullwidthWithoutWhiteSpace: 7,
    });
  });
});
