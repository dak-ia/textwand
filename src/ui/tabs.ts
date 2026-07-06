const STORAGE_KEY_PREFIX = "textwand:active-tab:";

const setup = (tabSet: HTMLElement): void => {
  const scope = tabSet.parentElement;
  if (!scope) return;

  const tabs = Array.from(tabSet.querySelectorAll<HTMLButtonElement>(".tab"));
  const panels = Array.from(scope.querySelectorAll<HTMLElement>(":scope > .tab-panel"));
  if (tabs.length === 0 || panels.length === 0) return;

  const name = tabSet.getAttribute("aria-label") ?? "default";
  const storageKey = STORAGE_KEY_PREFIX + name;

  const activate = (target: string): void => {
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", tab.dataset.tab === target ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== target;
    });
    localStorage.setItem(storageKey, target);
  };

  const stored = localStorage.getItem(storageKey);
  const initial = stored ?? tabs[0].dataset.tab;
  if (initial) activate(initial);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.dataset.tab) activate(tab.dataset.tab);
    });
  });
};

document.querySelectorAll<HTMLElement>(".tabs").forEach(setup);
