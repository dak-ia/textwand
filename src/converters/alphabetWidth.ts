export const alphabetToFullwidth = (text: string): string => {
  return text.replace(/[A-Za-z]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));
};

export const alphabetToHalfwidth = (text: string): string => {
  return text.replace(/[Ａ-Ｚａ-ｚ]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
};
