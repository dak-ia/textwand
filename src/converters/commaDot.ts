export const commaToDotFullwidth = (text: string, escapeDigit = false): string => {
  if (escapeDigit) {
    return text.replace(
      /((?<![0-9０-９]{1,3})，(?![^0-9０-９]{3})|(?<![^0-9０-９]{1,3})，(?![0-9０-９]{3})|(?<=[0-9０-９]{4,})，(?=[0-9０-９]{4,})|(?<![^0-9０-９]{1,3})，(?=[0-9０-９]{4,})|(?<=[0-9０-９]{4,})，(?=[0-9０-９]{3}))/g,
      "、"
    );
  }
  return text.replace(/，/g, "、");
};

export const commaToDotHalfwidth = (text: string, escapeDigit = false): string => {
  if (escapeDigit) {
    return text.replace(
      /((?<![0-9０-９]{1,3}),(?![^0-9０-９]{3})|(?<![^0-9０-９]{1,3}),(?![0-9０-９]{3})|(?<=[0-9０-９]{4,}),(?=[0-9０-９]{4,})|(?<![^0-9０-９]{1,3}),(?=[0-9０-９]{4,})|(?<=[0-9０-９]{4,}),(?=[0-9０-９]{3}))/g,
      "、"
    );
  }
  return text.replace(/,/g, "、");
};

export const dotToCommaFullwidth = (text: string): string => {
  return text.replace(/、/g, "，");
};

export const dotToCommaHalfwidth = (text: string): string => {
  return text.replace(/、/g, ",");
};
