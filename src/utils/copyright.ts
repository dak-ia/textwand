export const copyright = (startYear: number, currentYear: number = new Date().getFullYear()): string =>
  currentYear > startYear ? `${startYear}–${currentYear}` : String(startYear);
