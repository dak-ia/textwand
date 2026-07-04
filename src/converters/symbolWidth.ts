export const symbolToFullwidth = (text: string): string => {
  return text
    .replace(/[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) + 0xfee0)
    )
    .replace(/⦅/g, "｟")
    .replace(/⦆/g, "｠")
    .replace(/¢/g, "￠")
    .replace(/£/g, "￡")
    .replace(/¬/g, "￢")
    .replace(/¯/g, "￣")
    .replace(/¦/g, "￤")
    .replace(/¥/g, "￥")
    .replace(/￨/g, "│")
    .replace(/￩/g, "←")
    .replace(/￪/g, "↑")
    .replace(/￫/g, "→")
    .replace(/￬/g, "↓")
    .replace(/￭/g, "■")
    .replace(/￮/g, "○")
    .replace(/･/g, "・");
};

export const symbolToHalfwidth = (text: string): string => {
  return text
    .replace(/[\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF5E]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    )
    .replace(/｟/g, "⦅")
    .replace(/｠/g, "⦆")
    .replace(/￠/g, "¢")
    .replace(/￡/g, "£")
    .replace(/￢/g, "¬")
    .replace(/￣/g, "¯")
    .replace(/￤/g, "¦")
    .replace(/￥/g, "¥")
    .replace(/│/g, "￨")
    .replace(/←/g, "￩")
    .replace(/↑/g, "￪")
    .replace(/→/g, "￫")
    .replace(/↓/g, "￬")
    .replace(/■/g, "￭")
    .replace(/○/g, "￮")
    .replace(/・/g, "･");
};
