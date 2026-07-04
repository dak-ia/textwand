export const numberToFullwidth = (text: string): string => {
  return text.replace(/[0-9]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0));
};

export const numberToHalfwidth = (text: string): string => {
  return text.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
};
