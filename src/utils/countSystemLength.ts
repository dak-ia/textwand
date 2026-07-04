import { TextWidth } from "../types";

export const countSystemLength = (text: string): TextWidth => {
  const textWithoutLineBreak = text.replace(/[\r\n]/g, "");
  const textWithoutWhiteSpace = text.replace(/\s/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullWidth = text.replace(/[\x01-\x7E\uFF61-\uFF9F\u0020\u00A0]/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullwidthWithoutWhiteSpace = text.replace(/[\x01-\x7E\uFF61-\uFF9F^\s]/g, "");

  const textWithoutLineBreakSize = Array.from(textWithoutLineBreak).length;
  const textWithoutWhiteSpaceSize = Array.from(textWithoutWhiteSpace).length;
  const textOnlyFullWidthSize = Array.from(textOnlyFullWidth).length;
  const textOnlyFullwidthWithoutWhiteSpaceSize = Array.from(textOnlyFullwidthWithoutWhiteSpace).length;

  return {
    TextWithoutLineBreak: textWithoutLineBreakSize,
    TextWithoutWhiteSpace: textWithoutWhiteSpaceSize,
    TextOnlyFullWidth: textOnlyFullWidthSize,
    TextOnlyFullwidthWithoutWhiteSpace: textOnlyFullwidthWithoutWhiteSpaceSize,
  };
};
