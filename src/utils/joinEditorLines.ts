import { crToLf } from "./lineBreaks";

export type EditorToken = { kind: "text"; text: string } | { kind: "lineBreak" } | { kind: "blockBoundary" };

// innerTextは空行を保つためだけのbrも改行として返すので、見た目の行から組み立てる
export const joinEditorLines = (tokens: EditorToken[]): string => {
  const lines: string[] = [];
  let line: string | null = null;

  for (const token of tokens) {
    if (token.kind === "text") {
      if (token.text) line = (line ?? "") + token.text;
    } else if (token.kind === "lineBreak") {
      lines.push(crToLf(line ?? ""));
      line = null;
    } else {
      // pre-wrapではブロック末尾の改行は空行として表示されない
      if (line !== null) lines.push(crToLf(line).replace(/\n$/, ""));
      line = null;
    }
  }

  if (line !== null) lines.push(crToLf(line).replace(/\n$/, ""));
  return lines.join("\n");
};
