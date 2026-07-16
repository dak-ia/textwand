import {
  addDakuten,
  addHandakuten,
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
  removeDakuten,
  removeHandakuten,
  spaceToFullwidth,
  spaceToHalfwidth,
  symbolToFullwidth,
  symbolToHalfwidth,
  textTransformation,
} from "../converters";

export type ConvertContext = {
  escapeDigit: boolean;
  combiningOnly: boolean;
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
  // 濁点・半濁点。onなら結合用の付与/除去だけを扱う
  addDakuten: (text, context) => addDakuten(text, context.combiningOnly),
  addHandakuten: (text, context) => addHandakuten(text, context.combiningOnly),
  removeDakuten: (text, context) => removeDakuten(text, context.combiningOnly),
  removeHandakuten: (text, context) => removeHandakuten(text, context.combiningOnly),
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
