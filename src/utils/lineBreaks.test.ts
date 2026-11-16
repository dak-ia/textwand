import { crToLf, lineBreaksToLf, removeLineBreaks } from "./lineBreaks";

const NEL = String.fromCharCode(0x0085);
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);

describe("removeLineBreaks", () => {
  it("CR・LF・CRLFとVT・FF・NEL・LS・PSを除く", () => {
    expect(removeLineBreaks("a\r\nb\rc\nd\v1\f2" + NEL + "3" + LS + "4" + PS + "5")).toBe("abcd12345");
  });

  it("改行以外の空白と文字は残す", () => {
    expect(removeLineBreaks("a b\tc　d\n")).toBe("a b\tc　d");
  });

  it("空文字は空文字のまま", () => {
    expect(removeLineBreaks("")).toBe("");
  });
});

describe("lineBreaksToLf", () => {
  it("CR・LF・CRLFとVT・FF・NEL・LS・PSをLF1つにする", () => {
    expect(lineBreaksToLf("a\r\nb\rc\nd\v1\f2" + NEL + "3" + LS + "4" + PS + "5")).toBe("a\nb\nc\nd\n1\n2\n3\n4\n5");
  });

  it("LFの後のCRやCRの後のCRLFは改行2つになる", () => {
    expect(lineBreaksToLf("a\n\rb\r\r\nc")).toBe("a\n\nb\n\nc");
  });

  it("改行以外の空白と文字はそのまま", () => {
    expect(lineBreaksToLf("a b\tc　d")).toBe("a b\tc　d");
  });

  it("空文字は空文字のまま", () => {
    expect(lineBreaksToLf("")).toBe("");
  });
});

describe("crToLf", () => {
  it("CRLFと単独のCRをLFにそろえ、LFと他の文字はそのまま", () => {
    expect(crToLf("a\r\nb\rc\nd\r\n\r")).toBe("a\nb\nc\nd\n\n");
    expect(crToLf("\n\r\r\n")).toBe("\n\n\n");
    expect(crToLf("")).toBe("");
  });

  it("VT・FF・NEL・LS・PSはそのまま", () => {
    const text = "1\v2\f3" + NEL + "4" + LS + "5" + PS + "6";
    expect(crToLf(text)).toBe(text);
  });
});
