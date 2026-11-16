import { TextWidth } from "../types";
import { removeLineBreaks } from "./lineBreaks";

export const countSystemLength = (text: string, countLineBreaks = false): TextWidth => {
  const textWithoutLineBreak = removeLineBreaks(text);
  const textWithWhiteSpace = countLineBreaks ? text : textWithoutLineBreak;
  const textWithoutWhiteSpace = textWithoutLineBreak.replace(/\s/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullWidth = textWithoutLineBreak.replace(/[\x01-\x7E\uFF61-\uFF9F\u0020\u00A0]/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullwidthWithoutWhiteSpace = textWithoutLineBreak.replace(/[\x01-\x7E\uFF61-\uFF9F^\s]/g, "");

  const textWithWhiteSpaceSize = Array.from(textWithWhiteSpace).length;
  const textWithoutWhiteSpaceSize = Array.from(textWithoutWhiteSpace).length;
  const textOnlyFullWidthSize = Array.from(textOnlyFullWidth).length;
  const textOnlyFullwidthWithoutWhiteSpaceSize = Array.from(textOnlyFullwidthWithoutWhiteSpace).length;

  return {
    TextWithWhiteSpace: textWithWhiteSpaceSize,
    TextWithoutWhiteSpace: textWithoutWhiteSpaceSize,
    TextOnlyFullWidth: textOnlyFullWidthSize,
    TextOnlyFullwidthWithoutWhiteSpace: textOnlyFullwidthWithoutWhiteSpaceSize,
  };
};
