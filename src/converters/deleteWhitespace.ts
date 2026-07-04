export const delHalfSpace = (text: string): string => {
  return text.replace(/[\u0020\u00A0]/g, "");
};

export const delFullSpace = (text: string): string => {
  return text.replace(/\u3000/g, "");
};

export const delNewline = (text: string): string => {
  return text.replace(/[\r\n\v\f\u0085\u2028\u2029]/g, "");
};

export const delTab = (text: string): string => {
  return text.replace(/\t/g, "");
};
