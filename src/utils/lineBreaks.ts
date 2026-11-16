const LINE_BREAK = /\r\n|[\r\n\v\f\u0085\u2028\u2029]/g;

export const removeLineBreaks = (text: string): string => text.replace(LINE_BREAK, "");

export const lineBreaksToLf = (text: string): string => text.replace(LINE_BREAK, "\n");

// CRLFは2文字で1つの改行なので、LFと並ぶとCRLFになる単独のCRも含めてLFにそろえる
export const crToLf = (text: string): string => text.replace(/\r\n?/g, "\n");
