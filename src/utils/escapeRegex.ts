// 正規表現メタ文字をエスケープし、文字列をリテラルとして一致させる
export const escapeRegex = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
