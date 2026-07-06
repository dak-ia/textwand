import { Theme, parseTheme } from "../utils";

const STORAGE_KEY = "textwand:theme";

const applyTheme = (theme: Theme): void => {
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

let currentTheme = parseTheme(localStorage.getItem(STORAGE_KEY));
applyTheme(currentTheme);

document.querySelectorAll<HTMLInputElement>('input[name="theme"]').forEach((input) => {
  if (input.value === currentTheme) input.checked = true;
  input.addEventListener("change", () => {
    if (!input.checked) return;
    currentTheme = input.value as Theme;
    applyTheme(currentTheme);
    localStorage.setItem(STORAGE_KEY, currentTheme);
  });
});
