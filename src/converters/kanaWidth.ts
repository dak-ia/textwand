import { FULLWIDTH_KANA_KEYMAP, HALFWIDTH_KANA_KEYMAP } from "../constants";
import { replaceByKeymap } from "../utils";

export const kanaToFullwidth = (text: string): string => {
  return replaceByKeymap(text, HALFWIDTH_KANA_KEYMAP, FULLWIDTH_KANA_KEYMAP);
};

export const kanaToHalfwidth = (text: string): string => {
  return replaceByKeymap(text, FULLWIDTH_KANA_KEYMAP, HALFWIDTH_KANA_KEYMAP);
};
