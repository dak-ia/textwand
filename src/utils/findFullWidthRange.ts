type FullWidthRange = { start: number; end: number };

export const findFullWidthRange = (text: string): FullWidthRange[] => {
  // eslint-disable-next-line no-control-regex
  const FULL_WIDTH = /[^\x01-\x7E\uFF61-\uFF9F\x20\xA0]+/g;
  const range: FullWidthRange[] = [];
  for (const match of text.matchAll(FULL_WIDTH)) {
    const start = match.index as number;
    range.push({ start, end: start + match[0].length });
  }
  return range;
};
