import { TextWidth } from "../types";
import { lineBreaksToLf } from "./lineBreaks";

export const countVisualLength = (text: string, countLineBreaks = false): TextWidth => {
  // 先に改行を消すと、例えば「あ」と次の行頭の濁点が「あ゙」の1文字に数えられるので、改行は数えるときに除く
  const textWithLf = lineBreaksToLf(text);
  const textWithoutWhiteSpace = textWithLf.replace(/(?!\n)\s/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullWidth = textWithLf.replace(/(?!\n)[\x01-\x7E\uFF61-\uFF9F\u0020\u00A0]/g, "");
  // eslint-disable-next-line no-control-regex
  const textOnlyFullwidthWithoutWhiteSpace = textWithLf.replace(/(?!\n)[\x01-\x7E\uFF61-\uFF9F^\s]/g, "");

  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const countGraphemes = (target: string, withLineBreaks = false): number => {
    let size = 0;
    for (const { segment } of segmenter.segment(target)) {
      if (withLineBreaks || segment !== "\n") size++;
    }
    return size;
  };

  return {
    TextWithWhiteSpace: countGraphemes(textWithLf, countLineBreaks),
    TextWithoutWhiteSpace: countGraphemes(textWithoutWhiteSpace),
    TextOnlyFullWidth: countGraphemes(textOnlyFullWidth),
    TextOnlyFullwidthWithoutWhiteSpace: countGraphemes(textOnlyFullwidthWithoutWhiteSpace),
  };
};
