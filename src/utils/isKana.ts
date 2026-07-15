import { isHalfwidthKana } from "./isHalfwidthKana";

// かな判定。ひらがな・全角カタカナ・半角カタカナを含める
export const isKana = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return (code >= 0x3041 && code <= 0x3096) || (code >= 0x30a1 && code <= 0x30fa) || isHalfwidthKana(char);
};
