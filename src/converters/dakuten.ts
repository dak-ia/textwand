import { DAKUTEN_APPLIED, DAKUTEN_BASE, HANDAKUTEN_APPLIED, HANDAKUTEN_BASE } from "../constants";
import { isHalfwidthKana, isKana } from "../utils";

// 濁点/半濁点それぞれの設定を1つのkindにまとめて、付与・除去の関数を対称に扱えるようにする
type MarkKind = {
  // 出力に使うマーク。全角かなにはUnicode正典の結合文字、半角かなには半角スペーシング
  fullwidth: string;
  halfwidth: string;
  // 検出・除去対象の全変種(結合文字・半角スペーシング・過去バージョン互換のスタンドアロン)
  variants: Set<string>;
  // 基底文字 ⇄ 濁点/半濁点付き文字の相互map
  addMap: Map<string, string>;
  removeMap: Map<string, string>;
};

const buildKind = (
  fullwidth: string,
  halfwidth: string,
  compat: string,
  base: readonly string[],
  applied: readonly string[]
): MarkKind => ({
  fullwidth,
  halfwidth,
  variants: new Set([fullwidth, halfwidth, compat]),
  addMap: new Map(base.map((k, i) => [k, applied[i]])),
  removeMap: new Map(applied.map((k, i) => [k, base[i]])),
});

const DAKUTEN = buildKind("\u3099", "\uFF9E", "\u309B", DAKUTEN_BASE, DAKUTEN_APPLIED);
const HANDAKUTEN = buildKind("\u309A", "\uFF9F", "\u309C", HANDAKUTEN_BASE, HANDAKUTEN_APPLIED);

// 濁点/半濁点付き文字(が だ ば ぱ ...)。付与時に「既に付いてる」と判定するのに使う
const APPLIED_SET = new Set<string>([...DAKUTEN_APPLIED, ...HANDAKUTEN_APPLIED]);
// 付与時に「直後が既にマーク」判定に使う(濁点/半濁点どちらのkindでも)
const ALL_MARKS = new Set<string>([...DAKUTEN.variants, ...HANDAKUTEN.variants]);

// 1文字のかなに濁点/半濁点マークを付けた結果を返す
const withMark = (char: string, kind: MarkKind, combiningOnly: boolean): string => {
  if (APPLIED_SET.has(char) || !isKana(char)) return char;
  if (!combiningOnly) {
    const applied = kind.addMap.get(char);
    if (applied) return applied;
  }
  return char + (isHalfwidthKana(char) ? kind.halfwidth : kind.fullwidth);
};

const applyMark = (text: string, kind: MarkKind, combiningOnly: boolean): string => {
  const result: string[] = [];
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    const next = text[i + 1];
    // 直後が既に何らかの濁点/半濁点マークならその2文字はそのまま維持
    if (next !== undefined && ALL_MARKS.has(next)) {
      result.push(char, next);
      i += 2;
      continue;
    }
    result.push(withMark(char, kind, combiningOnly));
    i += 1;
  }
  return result.join("");
};

const stripMark = (text: string, kind: MarkKind, combiningOnly: boolean): string => {
  const result: string[] = [];
  for (const char of text) {
    if (kind.variants.has(char)) continue;
    if (!combiningOnly) {
      const base = kind.removeMap.get(char);
      if (base) {
        result.push(base);
        continue;
      }
    }
    result.push(char);
  }
  return result.join("");
};

export const addDakuten = (text: string, combiningOnly: boolean): string => applyMark(text, DAKUTEN, combiningOnly);

export const addHandakuten = (text: string, combiningOnly: boolean): string =>
  applyMark(text, HANDAKUTEN, combiningOnly);

export const removeDakuten = (text: string, combiningOnly: boolean): string => stripMark(text, DAKUTEN, combiningOnly);

export const removeHandakuten = (text: string, combiningOnly: boolean): string =>
  stripMark(text, HANDAKUTEN, combiningOnly);
