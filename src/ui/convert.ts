import { ConvertContext, convertActions } from "../actions";

const editor = document.getElementById("main_text");
const tools = document.querySelector<HTMLElement>(".page-main__tools");
const digitSkip = document.querySelector<HTMLInputElement>("#digit_skip_switch");
const combiningOnly = document.querySelector<HTMLInputElement>("#combining_only_switch");
const before = document.querySelector<HTMLTextAreaElement>("#before_text");
const after = document.querySelector<HTMLTextAreaElement>("#after_text");
const resetTextTransformationFields = document.getElementById("reset_text_transformation_field_btn");

if (editor && tools) {
  tools.addEventListener("click", (e) => {
    const button = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>("button[data-action]");
    const name = button?.dataset.action;
    if (!name) return;

    const action = convertActions[name];
    if (!action) return;

    const context: ConvertContext = {
      escapeDigit: digitSkip?.checked ?? false,
      combiningOnly: combiningOnly?.checked ?? false,
      before: before?.value ?? "",
      after: after?.value ?? "",
    };

    editor.innerText = action(editor.innerText, context);
    editor.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

resetTextTransformationFields?.addEventListener("click", () => {
  if (before) before.value = "";
  if (after) after.value = "";
});
