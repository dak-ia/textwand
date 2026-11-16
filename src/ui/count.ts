import { countSystemLength, countVisualLength, supplementText } from "../utils";
import { TextWidth } from "../types";
import { readEditorText } from "./readEditorText";

const editor = document.getElementById("main_text");
const countLineBreakSwitch = document.getElementById("count_line_break_switch") as HTMLInputElement;

if (editor) {
  const targets: { count: string; supplement: string; key: keyof TextWidth }[] = [
    { count: "count_number", supplement: "count_number_supplement", key: "TextWithWhiteSpace" },
    { count: "count_full_number", supplement: "count_full_number_supplement", key: "TextOnlyFullWidth" },
    { count: "count_number_nsp", supplement: "count_number_nsp_supplement", key: "TextWithoutWhiteSpace" },
    {
      count: "count_full_number_nsp",
      supplement: "count_full_number_nsp_supplement",
      key: "TextOnlyFullwidthWithoutWhiteSpace",
    },
  ];

  const elements = targets.map((t) => ({
    count: document.getElementById(t.count),
    supplement: document.getElementById(t.supplement),
    key: t.key,
  }));

  const updateCounters = (): void => {
    const text = readEditorText(editor);
    const countLineBreaks = countLineBreakSwitch?.checked ?? false;
    const visual = countVisualLength(text, countLineBreaks);
    const system = countSystemLength(text, countLineBreaks);

    elements.forEach(({ count, supplement, key }) => {
      if (count) count.textContent = String(visual[key]);
      if (supplement) supplement.textContent = supplementText(visual[key], system[key]);
    });
  };

  editor.addEventListener("input", updateCounters);
  countLineBreakSwitch?.addEventListener("change", updateCounters);
}
