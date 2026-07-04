export const spaceToFullwidth = (text: string): string => {
  return text.replace(/[\u0020\u00A0]/g, "\u3000");
};

export const spaceToHalfwidth = (text: string): string => {
  return text.replace(/\u3000/g, "\u0020");
};
