// 半角カタカナ判定。ｰ(U+FF70)は含めない
export const isHalfwidthKana = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return (code >= 0xff66 && code <= 0xff6f) || (code >= 0xff71 && code <= 0xff9d);
};
