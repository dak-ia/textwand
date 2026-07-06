import {
  alphabetToFullwidth,
  alphabetToHalfwidth,
  circleToPeriodFullwidth,
  circleToPeriodHalfwidth,
  commaToDotFullwidth,
  commaToDotHalfwidth,
  delFullSpace,
  delHalfSpace,
  delNewline,
  delTab,
  dotToCommaFullwidth,
  dotToCommaHalfwidth,
  hiraganaToKatakana,
  kanaToFullwidth,
  kanaToHalfwidth,
  katakanaToHiragana,
  numberToFullwidth,
  numberToHalfwidth,
  periodToCircleFullwidth,
  periodToCircleHalfwidth,
  spaceToFullwidth,
  spaceToHalfwidth,
  symbolToFullwidth,
  symbolToHalfwidth,
  textTransformation,
} from "../converters";

export type ConvertContext = {
  escapeDigit: boolean;
  before: string;
  after: string;
};

type ConvertAction = (_text: string, _context: ConvertContext) => string;

export const convertActions: Record<string, ConvertAction> = {
  // 削除
  delFullSpace,
  delHalfSpace,
  delNewline,
  delTab,
  // 大文字小文字
  upperCase: (text) => text.toUpperCase(),
  lowerCase: (text) => text.toLowerCase(),
  // かな
  katakanaToHiragana,
  hiraganaToKatakana,
  // 全角半角
  numberToFullwidth,
  numberToHalfwidth,
  alphabetToFullwidth,
  alphabetToHalfwidth,
  kanaToFullwidth,
  kanaToHalfwidth,
  spaceToFullwidth,
  spaceToHalfwidth,
  symbolToFullwidth,
  symbolToHalfwidth,
  // 句読点。数字スキップが有効なときだけ数字に挟まれた記号を除外する
  periodToCircleFullwidth: (text, context) => periodToCircleFullwidth(text, context.escapeDigit),
  periodToCircleHalfwidth: (text, context) => periodToCircleHalfwidth(text, context.escapeDigit),
  commaToDotFullwidth: (text, context) => commaToDotFullwidth(text, context.escapeDigit),
  commaToDotHalfwidth: (text, context) => commaToDotHalfwidth(text, context.escapeDigit),
  circleToPeriodFullwidth,
  circleToPeriodHalfwidth,
  dotToCommaFullwidth,
  dotToCommaHalfwidth,
  // 置換
  textTransformation: (text, context) => textTransformation(text, context.before, context.after),
};
