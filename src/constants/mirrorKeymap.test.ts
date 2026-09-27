import { MIRROR_KEYMAP } from "./mirrorKeymap";

describe("MIRROR_KEYMAP", () => {
  it("通常の字に重複がない", () => {
    const normals = MIRROR_KEYMAP.map(([normal]) => normal);
    expect(new Set(normals).size).toBe(normals.length);
  });

  it("全ての要素が1文字である", () => {
    const invalid = MIRROR_KEYMAP.filter((entry) => entry.some((char) => [...char].length !== 1));
    expect(invalid).toEqual([]);
  });

  it("英小文字a〜zと英大文字A〜Zを網羅する", () => {
    const normals = new Set(MIRROR_KEYMAP.map(([normal]) => normal));
    for (let code = "a".charCodeAt(0); code <= "z".charCodeAt(0); code++) {
      expect(normals.has(String.fromCharCode(code))).toBe(true);
    }
    for (let code = "A".charCodeAt(0); code <= "Z".charCodeAt(0); code++) {
      expect(normals.has(String.fromCharCode(code))).toBe(true);
    }
  });

  it("数字0〜9を網羅する", () => {
    const normals = new Set(MIRROR_KEYMAP.map(([normal]) => normal));
    for (let digit = 0; digit <= 9; digit++) {
      expect(normals.has(String(digit))).toBe(true);
    }
  });

  it("左右反転の代表的な組が期待通り", () => {
    const map = new Map(MIRROR_KEYMAP.map(([normal, leftRight]) => [normal, leftRight]));
    expect(map.get("a")).toBe("ɒ");
    expect(map.get("b")).toBe("d");
    expect(map.get("B")).toBe("ᗺ");
    expect(map.get("E")).toBe("ꓱ");
    expect(map.get("3")).toBe("Ɛ");
    expect(map.get("(")).toBe(")");
  });

  it("上下反転の代表的な組が期待通り", () => {
    const map = new Map(MIRROR_KEYMAP.map(([normal, , upDown]) => [normal, upDown]));
    expect(map.get("a")).toBe("ɐ");
    expect(map.get("b")).toBe("q");
    expect(map.get("A")).toBe("ꓯ");
    expect(map.get("6")).toBe("9");
    expect(map.get("!")).toBe("¡");
  });

  it("自己対称の字は通常の字がそのまま入る", () => {
    const lr = new Map(MIRROR_KEYMAP.map(([normal, leftRight]) => [normal, leftRight]));
    const ud = new Map(MIRROR_KEYMAP.map(([normal, , upDown]) => [normal, upDown]));
    expect(lr.get("A")).toBe("A");
    expect(lr.get("o")).toBe("o");
    expect(ud.get("H")).toBe("H");
    expect(ud.get("x")).toBe("x");
  });

  it("ZはS、zはsに反転する", () => {
    const map = new Map(MIRROR_KEYMAP.map(([normal, leftRight]) => [normal, leftRight]));
    expect(map.get("Z")).toBe("S");
    expect(map.get("z")).toBe("s");
  });
});
