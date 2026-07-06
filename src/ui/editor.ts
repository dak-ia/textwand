import { createHistory } from "../utils";

const editor = document.getElementById("main_text");

if (editor) {
  const undoButton = document.getElementById("undo_btn");
  const redoButton = document.getElementById("redo_btn");
  const resetButton = document.getElementById("reset_btn");

  const history = createHistory(editor.innerText);

  // undo/redo/reset ボタンの活性状態を履歴とテキストの状態から反映する
  const updateButtons = (): void => {
    if (undoButton instanceof HTMLButtonElement) undoButton.disabled = !history.canUndo();
    if (redoButton instanceof HTMLButtonElement) redoButton.disabled = !history.canRedo();
    if (resetButton instanceof HTMLButtonElement) {
      resetButton.disabled = editor.innerText === "" && !history.canUndo() && !history.canRedo();
    }
  };

  const notify = (): void => {
    editor.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const setText = (text: string): void => {
    editor.innerText = text;
    notify();
  };

  // キャレット位置にテキストを挿入する(Tab挿入・プレーン貼り付けで使用)
  const insertAtCaret = (text: string): void => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      editor.append(text);
      return;
    }
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  // IME入力中はDOMが未確定状態のまま更新されるので履歴に載せない
  // input eventのisComposingはブラウザによって確定タイミングでの値が揺れるため、
  // compositionstart/endで手動trackingし、確定はcompositionendで明示的にrecordする
  let composing = false;
  editor.addEventListener("compositionstart", () => {
    composing = true;
  });
  editor.addEventListener("compositionend", () => {
    composing = false;
    history.record(editor.innerText);
    updateButtons();
  });

  editor.addEventListener("input", () => {
    if (composing) return;
    history.record(editor.innerText);
    updateButtons();
  });

  editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      insertAtCaret("\t");
      notify();
      return;
    }
    // Ctrl/Cmdのどちらか一方だけ押されているとき、undo/redoを処理する
    const withModifier = e.ctrlKey !== e.metaKey;
    if (!withModifier) return;
    const key = e.key.toLowerCase();
    if (key === "z" && !e.shiftKey) {
      e.preventDefault();
      const text = history.undo();
      if (text !== undefined) setText(text);
    } else if (key === "y" || (key === "z" && e.shiftKey)) {
      e.preventDefault();
      const text = history.redo();
      if (text !== undefined) setText(text);
    }
  });

  editor.addEventListener("paste", (e) => {
    e.preventDefault();
    insertAtCaret(e.clipboardData?.getData("text/plain") ?? "");
    notify();
  });

  undoButton?.addEventListener("click", () => {
    const text = history.undo();
    if (text !== undefined) setText(text);
  });
  redoButton?.addEventListener("click", () => {
    const text = history.redo();
    if (text !== undefined) setText(text);
  });

  resetButton?.addEventListener("click", () => {
    if (!window.confirm("テキストと入力履歴を消去します。よろしいですか？")) return;
    editor.innerText = "";
    history.clear("");
    notify();
  });

  updateButtons();
}
