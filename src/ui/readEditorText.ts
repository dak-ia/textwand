import { EditorToken, joinEditorLines } from "../utils";

const BOUNDARY: EditorToken = { kind: "blockBoundary" };

export const readEditorText = (editor: HTMLElement): string => {
  const tokens: EditorToken[] = [];
  const collect = (node: Node): void => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        tokens.push({ kind: "text", text: child.textContent ?? "" });
      } else if (child instanceof HTMLBRElement) {
        tokens.push({ kind: "lineBreak" });
        // ブラウザがEnterで行を分けるときに使う要素
      } else if (child instanceof HTMLDivElement || child instanceof HTMLParagraphElement) {
        tokens.push(BOUNDARY);
        collect(child);
        tokens.push(BOUNDARY);
      } else {
        collect(child);
      }
    }
  };
  collect(editor);
  return joinEditorLines(tokens);
};
