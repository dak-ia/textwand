import { countVisualLength } from "./countVisualLength";

const NEL = String.fromCharCode(0x0085);
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);
const COMBINING_ACUTE = String.fromCharCode(0x0301);
const COMBINING_DAKUTEN = String.fromCharCode(0x3099);
const THUMBS_UP = String.fromCodePoint(0x1f44d);
const SKIN_TONE = String.fromCodePoint(0x1f3fb);
const REGIONAL_J = String.fromCodePoint(0x1f1ef);
const REGIONAL_P = String.fromCodePoint(0x1f1f5);

describe("countVisualLength", () => {
  it("空文字は全指標が0", () => {
    expect(countVisualLength("")).toEqual({
      TextWithWhiteSpace: 0,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("半角ASCIIのみは全角カウントが0になる", () => {
    expect(countVisualLength("abc")).toEqual({
      TextWithWhiteSpace: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("全角のみは全指標が同じ値になる", () => {
    expect(countVisualLength("あいう")).toEqual({
      TextWithWhiteSpace: 3,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
  });

  it("半角/全角/空白/改行が混在すると各指標が意図通り差分を出す", () => {
    // eslint-disable-next-line no-irregular-whitespace
    // "a あ　い\n" は 半角a + 半角空白 + あ + 全角空白 + い + 改行
    expect(countVisualLength("a あ　い\n")).toEqual({
      TextWithWhiteSpace: 5,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
  });

  it("改行は既定では数えない", () => {
    expect(countVisualLength("a\nb")).toEqual({
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("改行を数えるよう指定すると空白込みだけに1文字として加わる", () => {
    expect(countVisualLength("a\nb", true)).toEqual({
      TextWithWhiteSpace: 3,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("改行を数えるかで変わるのは空白込みの数だけ", () => {
    // eslint-disable-next-line no-irregular-whitespace
    // "あ　い\n\tう" は あ + 全角空白 + い + 改行 + タブ + う
    expect(countVisualLength("あ　い\n\tう")).toEqual({
      TextWithWhiteSpace: 5,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 4,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
    expect(countVisualLength("あ　い\n\tう", true)).toEqual({
      TextWithWhiteSpace: 6,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 4,
      TextOnlyFullwidthWithoutWhiteSpace: 3,
    });
  });

  it("LSもCR・LFと同じく改行として扱う", () => {
    expect(countVisualLength("あ" + LS + "い\n")).toEqual({
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 2,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
    expect(countVisualLength("あ" + LS + "い\n", true)).toEqual({
      TextWithWhiteSpace: 4,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 2,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
  });

  it("VT・FF・NEL・PSもCR・LFと同じく改行として扱う", () => {
    const text = "a\vあ" + NEL + "　い" + PS + "\f";
    expect(countVisualLength(text)).toEqual({
      TextWithWhiteSpace: 4,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
    expect(countVisualLength(text, true)).toEqual({
      TextWithWhiteSpace: 8,
      TextWithoutWhiteSpace: 3,
      TextOnlyFullWidth: 3,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    });
  });

  it("改行を数えないときはCRLFも除く", () => {
    expect(countVisualLength("a\r\nb").TextWithWhiteSpace).toBe(2);
  });

  it("改行を数えるときCRLFは見た目上の1文字として数える", () => {
    expect(countVisualLength("a\r\nb", true).TextWithWhiteSpace).toBe(3);
  });

  it("単独のCRも改行として扱う", () => {
    expect(countVisualLength("a\rb").TextWithWhiteSpace).toBe(2);
    expect(countVisualLength("a\rb", true).TextWithWhiteSpace).toBe(3);
  });

  it("改行だけの入力は改行を数えるときだけ空白込みに入る", () => {
    expect(countVisualLength("\n\n")).toEqual({
      TextWithWhiteSpace: 0,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
    expect(countVisualLength("\n\n", true)).toEqual({
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 0,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
  });

  it("改行を数えないときも行頭の結合文字・肌色修飾子・地域指示記号を前の行の字とまとめない", () => {
    expect(countVisualLength("a\n" + COMBINING_ACUTE).TextWithWhiteSpace).toBe(2);
    expect(countVisualLength(THUMBS_UP + "\n" + SKIN_TONE).TextWithWhiteSpace).toBe(2);
    expect(countVisualLength(REGIONAL_J + "\r\n" + REGIONAL_P).TextWithWhiteSpace).toBe(2);
    expect(countVisualLength("a\n" + COMBINING_ACUTE, true).TextWithWhiteSpace).toBe(3);
    expect(countVisualLength("あ" + LS + COMBINING_ACUTE + "\n").TextWithWhiteSpace).toBe(2);
  });

  it("空白抜き・全角のみの数でも前後の行の字を1文字にまとめない", () => {
    const separated = {
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 2,
      TextOnlyFullwidthWithoutWhiteSpace: 2,
    };
    expect(countVisualLength(THUMBS_UP + "\n" + SKIN_TONE)).toEqual(separated);
    expect(countVisualLength(REGIONAL_J + "\r\n" + REGIONAL_P)).toEqual(separated);
    expect(countVisualLength("あ\n" + COMBINING_DAKUTEN)).toEqual(separated);
    expect(countVisualLength("ﾊ\nﾞ")).toEqual({
      TextWithWhiteSpace: 2,
      TextWithoutWhiteSpace: 2,
      TextOnlyFullWidth: 0,
      TextOnlyFullwidthWithoutWhiteSpace: 0,
    });
    expect(countVisualLength(THUMBS_UP + "\n" + SKIN_TONE, true)).toEqual({ ...separated, TextWithWhiteSpace: 3 });
  });

  it("ZWJ絵文字は見た目上の1文字としてカウントする", () => {
    // 👨‍👨‍👦‍👦 は Intl.Segmenter によって1つのgrapheme clusterとして扱われる
    expect(countVisualLength("👨‍👨‍👦‍👦")).toEqual({
      TextWithWhiteSpace: 1,
      TextWithoutWhiteSpace: 1,
      TextOnlyFullWidth: 1,
      TextOnlyFullwidthWithoutWhiteSpace: 1,
    });
  });
});
