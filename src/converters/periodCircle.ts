export const periodToCircleFullwidth = (text: string, escapeDigit = false): string => {
  if (escapeDigit) {
    return text.replace(
      /((?<![0-9０-９]+)．(?![0-9０-９]+)|(?<![0-9０-９]+)．(?![^0-9０-９]+)|(?<![^0-9０-９]+)．(?![0-9０-９]+))/g,
      "。"
    );
  }
  return text.replace(/．/g, "。");
};

export const periodToCircleHalfwidth = (text: string, escapeDigit = false): string => {
  if (escapeDigit) {
    return text.replace(
      /((?<![0-9０-９]+)\.(?![0-9０-９]+)|(?<![0-9０-９]+)\.(?![^0-9０-９]+)|(?<![^0-9０-９]+)\.(?![0-9０-９]+))/g,
      "。"
    );
  }
  return text.replace(/\./g, "。");
};

export const circleToPeriodFullwidth = (text: string): string => {
  return text.replace(/。/g, "．");
};

export const circleToPeriodHalfwidth = (text: string): string => {
  return text.replace(/。/g, ".");
};
