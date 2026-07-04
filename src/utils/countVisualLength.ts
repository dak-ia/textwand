import { TextWidth } from "../types";

export const countVisualLength = (text: string): TextWidth => {
  const textWithoutLineBreak = text.replace(/[\r\n]/g, "");
  const textWithoutWhiteSpace = text.replace(/\s/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullWidth = text.replace(/[\x01-\x7E\uFF61-\uFF9F\u0020\u00A0]/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullwidthWithoutWhiteSpace = text.replace(/[\x01-\x7E\uFF61-\uFF9F^\s]/g, "");

  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });

  const textWithoutLineBreakSize = [...segmenter.segment(textWithoutLineBreak)].length;
  const textWithoutWhiteSpaceSize = [...segmenter.segment(textWithoutWhiteSpace)].length;
  const textOnlyFullWidthSize = [...segmenter.segment(textOnlyFullWidth)].length;
  const textOnlyFullwidthWithoutWhiteSpaceSize = [...segmenter.segment(textOnlyFullwidthWithoutWhiteSpace)].length;

  return {
    TextWithoutLineBreak: textWithoutLineBreakSize,
    TextWithoutWhiteSpace: textWithoutWhiteSpaceSize,
    TextOnlyFullWidth: textOnlyFullWidthSize,
    TextOnlyFullwidthWithoutWhiteSpace: textOnlyFullwidthWithoutWhiteSpaceSize,
  };
};
