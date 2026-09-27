import { MIRROR_KEYMAP, MirrorEntry } from "../constants";

type SelectMirror = (_entry: MirrorEntry) => string;

const selectLeftRight: SelectMirror = ([, leftRight]) => leftRight;
const selectUpDown: SelectMirror = ([, , upDown]) => upDown;

// U+FF01-FF5Eは全角ASCII
const toHalfwidthAscii = (char: string): string => {
  const code = char.charCodeAt(0);
  return code >= 0xff01 && code <= 0xff5e ? String.fromCharCode(code - 0xfee0) : char;
};

const buildMirrorMap = (selectMirror: SelectMirror): Map<string, string> => {
  const map = new Map<string, string>();
  for (const entry of MIRROR_KEYMAP) map.set(entry[0], selectMirror(entry));
  for (const entry of MIRROR_KEYMAP) {
    const mirrored = selectMirror(entry);
    if (!map.has(mirrored)) map.set(mirrored, entry[0]);
  }
  return map;
};

const LEFT_RIGHT_MAP = buildMirrorMap(selectLeftRight);
const UP_DOWN_MAP = buildMirrorMap(selectUpDown);

const mapChars = (text: string, map: Map<string, string>): string =>
  [...text].map((char) => map.get(toHalfwidthAscii(char)) ?? char).join("");

const GRAPHEME_SEGMENTER = new Intl.Segmenter("ja", { granularity: "grapheme" });

// コードポイント単位で反転すると濁点などの結合文字が基底の字から離れる
const reverseGraphemes = (text: string): string =>
  [...GRAPHEME_SEGMENTER.segment(text)]
    .map(({ segment }) => segment)
    .reverse()
    .join("");

const reverseLeftRight = (text: string): string => text.split("\n").map(reverseGraphemes).join("\n");

const reverseUpDown = (text: string): string => text.split("\n").map(reverseGraphemes).reverse().join("\n");

export const mirrorLeftRight = (text: string, reverseOrder: boolean): string => {
  const mapped = mapChars(text, LEFT_RIGHT_MAP);
  return reverseOrder ? reverseLeftRight(mapped) : mapped;
};

export const mirrorUpDown = (text: string, reverseOrder: boolean): string => {
  const mapped = mapChars(text, UP_DOWN_MAP);
  return reverseOrder ? reverseUpDown(mapped) : mapped;
};
