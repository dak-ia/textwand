import { removeLineBreaks } from "../utils";

export const delHalfSpace = (text: string): string => {
  return text.replace(/[\u0020\u00A0]/g, "");
};

export const delFullSpace = (text: string): string => {
  return text.replace(/\u3000/g, "");
};

export const delNewline = (text: string): string => {
  return removeLineBreaks(text);
};

export const delTab = (text: string): string => {
  return text.replace(/\t/g, "");
};
