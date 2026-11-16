export const writeEditorText = (editor: HTMLElement, text: string): void => {
  const fragment = document.createDocumentFragment();
  // ブラウザがEnterで入れる形にそろえ、行と改行を別のテキストノードにする
  text.split("\n").forEach((line, index) => {
    if (index > 0) fragment.append("\n");
    if (line) fragment.append(line);
  });
  // 末尾の改行の後ろは空行として表示されないので、表示用の改行を1つ足す
  if (text.endsWith("\n")) fragment.append("\n");
  editor.replaceChildren(fragment);
};
