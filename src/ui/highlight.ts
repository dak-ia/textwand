import { findFullWidthRange } from "../utils";

const editor = document.getElementById("main_text");
const toggle = document.getElementById("highlight_switch");

if (editor && toggle instanceof HTMLInputElement) {
  const canHighlight = typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined";

  if (!canHighlight) {
    toggle.closest<HTMLElement>(".editor-controls__highlight")?.style.setProperty("display", "none");
  } else {
    const HIGHLIGHT_NAME = "mark_full_width";

    const update = (): void => {
      if (!toggle.checked) {
        CSS.highlights.delete(HIGHLIGHT_NAME);
        return;
      }
      const highlight = new Highlight();
      const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode() as Text | null;
      while (node) {
        for (const fullWidthRange of findFullWidthRange(node.data)) {
          const range = new Range();
          range.setStart(node, fullWidthRange.start);
          range.setEnd(node, fullWidthRange.end);
          highlight.add(range);
        }
        node = walker.nextNode() as Text | null;
      }
      CSS.highlights.set(HIGHLIGHT_NAME, highlight);
    };

    editor.addEventListener("input", update);
    toggle.addEventListener("change", update);
  }
}
