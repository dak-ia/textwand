export const supplementText = (visual: number, system: number): string =>
  visual !== system ? `データ長 ${system}` : "";
