import { FULLWIDTH_KANA_KEYMAP, HIRAGANA_KEYMAP } from "../constants";
import { replaceByKeymap } from "../utils";

export const katakanaToHiragana = (text: string): string => {
  return replaceByKeymap(text, FULLWIDTH_KANA_KEYMAP, HIRAGANA_KEYMAP);
};

export const hiraganaToKatakana = (text: string): string => {
  return replaceByKeymap(text, HIRAGANA_KEYMAP, FULLWIDTH_KANA_KEYMAP);
};
