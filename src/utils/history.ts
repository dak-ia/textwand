type Patch = { position: number; deleted: string; inserted: string };

type History = {
  record: (_value: string) => void;
  undo: () => string | undefined;
  redo: () => string | undefined;
  clear: (_value: string) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
};

type CreateHistoryOptions = {
  // 差分の合計文字数の上限。UTF-16の2byte/char換算で50_000_000は約100MB相当
  maxChars?: number;
  // batchMs未満の連続recordは1つのundo単位にまとめる
  batchMs?: number;
  now?: () => number;
};

const DEFAULT_MAX_CHARS = 50_000_000;
const DEFAULT_BATCH_MS = 500;

// 前方から共通prefix、後方から共通suffixを剥がして間の差分だけ抽出する
const computePatch = (from: string, to: string): Patch => {
  const minLen = Math.min(from.length, to.length);
  let start = 0;
  while (start < minLen && from.charCodeAt(start) === to.charCodeAt(start)) {
    start++;
  }
  let endFrom = from.length;
  let endTo = to.length;
  while (endFrom > start && endTo > start && from.charCodeAt(endFrom - 1) === to.charCodeAt(endTo - 1)) {
    endFrom--;
    endTo--;
  }
  return {
    position: start,
    deleted: from.slice(start, endFrom),
    inserted: to.slice(start, endTo),
  };
};

const applyPatch = (text: string, patch: Patch): string =>
  text.slice(0, patch.position) + patch.inserted + text.slice(patch.position + patch.deleted.length);

const invertPatch = (patch: Patch): Patch => ({
  position: patch.position,
  deleted: patch.inserted,
  inserted: patch.deleted,
});

const patchSize = (patch: Patch): number => patch.deleted.length + patch.inserted.length;

// 差分パッチをスタックで持ち、undo/redoで前後に行き来する履歴
export const createHistory = (initial: string, options: CreateHistoryOptions = {}): History => {
  const maxChars = options.maxChars ?? DEFAULT_MAX_CHARS;
  const batchMs = options.batchMs ?? DEFAULT_BATCH_MS;
  const now = options.now ?? Date.now;

  let text = initial;
  // 現バッチの起点。merge時はここからのdiffを取り直す
  let batchStartText = initial;
  let canMerge = false;
  let lastTime = 0;
  const undoStack: Patch[] = [];
  const redoStack: Patch[] = [];
  let undoChars = 0;

  // 上限超過分を最古のundoから捨てる
  const trim = (): void => {
    while (undoChars > maxChars && undoStack.length > 0) {
      const dropped = undoStack.shift()!;
      undoChars -= patchSize(dropped);
    }
  };

  return {
    record: (value) => {
      if (value === text) return;
      const time = now();
      if (canMerge && time - lastTime < batchMs && undoStack.length > 0) {
        // バッチ内の連続入力は起点からdiffを取り直してtopを差し替える
        const forward = computePatch(batchStartText, value);
        const newInverse = invertPatch(forward);
        const oldInverse = undoStack[undoStack.length - 1];
        undoChars -= patchSize(oldInverse);
        undoChars += patchSize(newInverse);
        undoStack[undoStack.length - 1] = newInverse;
      } else {
        batchStartText = text;
        const forward = computePatch(text, value);
        const inverse = invertPatch(forward);
        undoStack.push(inverse);
        undoChars += patchSize(inverse);
      }
      redoStack.length = 0;
      text = value;
      lastTime = time;
      canMerge = true;
      trim();
    },
    undo: () => {
      if (undoStack.length === 0) return undefined;
      const inverse = undoStack.pop()!;
      undoChars -= patchSize(inverse);
      text = applyPatch(text, inverse);
      redoStack.push(invertPatch(inverse));
      canMerge = false;
      return text;
    },
    redo: () => {
      if (redoStack.length === 0) return undefined;
      const forward = redoStack.pop()!;
      text = applyPatch(text, forward);
      const inverse = invertPatch(forward);
      undoStack.push(inverse);
      undoChars += patchSize(inverse);
      canMerge = false;
      trim();
      return text;
    },
    clear: (value) => {
      undoStack.length = 0;
      redoStack.length = 0;
      undoChars = 0;
      text = value;
      batchStartText = value;
      canMerge = false;
      lastTime = 0;
    },
    canUndo: () => undoStack.length > 0,
    canRedo: () => redoStack.length > 0,
  };
};
