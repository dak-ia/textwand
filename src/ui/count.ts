import { countSystemLength, countVisualLength, supplementText } from "../utils";
import { TextWidth } from "../types";

const editor = document.getElementById("main_text");

if (editor) {
  const targets: { count: string; supplement: string; key: keyof TextWidth }[] = [
    { count: "count_number", supplement: "count_number_supplement", key: "TextWithoutLineBreak" },
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
    const text = editor.innerText;
    const visual = countVisualLength(text);
    const system = countSystemLength(text);

    elements.forEach(({ count, supplement, key }) => {
      if (count) count.textContent = String(visual[key]);
      if (supplement) supplement.textContent = supplementText(visual[key], system[key]);
    });
  };

  editor.addEventListener("input", updateCounters);
}
