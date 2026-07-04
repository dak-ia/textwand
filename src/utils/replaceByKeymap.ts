import { escapeRegex } from "./escapeRegex";

export const replaceByKeymap = (text: string, fromKeymap: readonly string[], toKeymap: readonly string[]): string => {
  return fromKeymap.reduce((result, e, i) => {
    if (i >= toKeymap.length) return result;
    return result.replace(new RegExp(escapeRegex(e), "g"), toKeymap[i]);
  }, text);
};
