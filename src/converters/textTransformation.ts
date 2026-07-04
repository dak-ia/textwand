import { escapeRegex } from "../utils";

const escapeReplacement = (text: string): string => {
  return text.split("$").join("$$");
};

export const textTransformation = (text: string, before: string, after: string): string => {
  return text.replace(new RegExp(escapeRegex(before), "g"), escapeReplacement(after));
};
