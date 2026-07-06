import { createHistory } from "./history";

describe("createHistory", () => {
  describe("基本挙動", () => {
    it("recordした値からundoで前の値、redoで戻せる", () => {
      const history = createHistory("a");
      history.record("b");
      expect(history.undo()).toBe("a");
      expect(history.redo()).toBe("b");
    });

    it("直前と同じ値のrecordは無視する", () => {
      const history = createHistory("a");
      history.record("a");
      expect(history.undo()).toBeUndefined();
    });

    it("初期状態からのundoはundefinedを返す", () => {
      const history = createHistory("a");
      expect(history.undo()).toBeUndefined();
    });

    it("最新位置からのredoはundefinedを返す", () => {
      const history = createHistory("a");
      history.record("b");
      expect(history.redo()).toBeUndefined();
    });

    it("undo中にrecordすると先の履歴は破棄される", () => {
      const history = createHistory("a", { batchMs: 0 });
      history.record("b");
      history.record("c");
      history.undo();
      history.record("d");
      expect(history.redo()).toBeUndefined();
      expect(history.undo()).toBe("b");
    });

    it("clearで指定値の単一履歴にリセットする", () => {
      const history = createHistory("a");
      history.record("b");
      history.record("c");
      history.clear("x");
      expect(history.canUndo()).toBe(false);
      expect(history.canRedo()).toBe(false);
      // clear後にrecord→undoで"x"が返ることでclearの値が現在値になったと確認する
      history.record("y");
      expect(history.undo()).toBe("x");
    });
  });

  describe("差分パッチ", () => {
    it("末尾への追加も正しくundo/redoできる", () => {
      const history = createHistory("hello", { batchMs: 0 });
      history.record("hello world");
      expect(history.undo()).toBe("hello");
      expect(history.redo()).toBe("hello world");
    });

    it("先頭への追加も正しくundo/redoできる", () => {
      const history = createHistory("world", { batchMs: 0 });
      history.record("hello world");
      expect(history.undo()).toBe("world");
      expect(history.redo()).toBe("hello world");
    });

    it("途中への挿入も正しくundo/redoできる", () => {
      const history = createHistory("hello world", { batchMs: 0 });
      history.record("hello beautiful world");
      expect(history.undo()).toBe("hello world");
      expect(history.redo()).toBe("hello beautiful world");
    });

    it("全文削除も正しくundo/redoできる", () => {
      const history = createHistory("hello", { batchMs: 0 });
      history.record("");
      expect(history.undo()).toBe("hello");
      expect(history.redo()).toBe("");
    });

    it("全文置換も正しくundo/redoできる", () => {
      const history = createHistory("hello", { batchMs: 0 });
      history.record("world");
      expect(history.undo()).toBe("hello");
      expect(history.redo()).toBe("world");
    });

    it("空文字↔値の往復もundoで最初まで戻れる", () => {
      const history = createHistory("", { batchMs: 0 });
      history.record("a");
      history.record("");
      history.record("b");
      expect(history.undo()).toBe("");
      expect(history.undo()).toBe("a");
      expect(history.undo()).toBe("");
    });
  });

  describe("batching", () => {
    it("batchMs内の連続recordは1つのundo単位にまとまる", () => {
      let t = 0;
      const history = createHistory("", { batchMs: 500, now: () => t });
      history.record("a");
      t = 100;
      history.record("ab");
      t = 200;
      history.record("abc");
      // 全部同一バッチなので "" ↔ "abc" の1step扱い
      expect(history.undo()).toBe("");
      expect(history.undo()).toBeUndefined();
    });

    it("batchMs以上経過したrecordは新しいundo単位になる", () => {
      let t = 0;
      const history = createHistory("", { batchMs: 500, now: () => t });
      history.record("a");
      t = 600;
      history.record("ab");
      expect(history.undo()).toBe("a");
      expect(history.undo()).toBe("");
    });

    it("undo後のrecordは時間内でも新しいundo単位になる", () => {
      let t = 0;
      const history = createHistory("a", { batchMs: 500, now: () => t });
      history.record("b");
      t = 100;
      history.undo();
      t = 200;
      history.record("c");
      // undo後は必ず新バッチ扱い。時間内でもmergeせず、cはaに戻れる別のundo単位
      expect(history.undo()).toBe("a");
    });

    it("redo後のrecordも新しいundo単位になる", () => {
      let t = 0;
      const history = createHistory("a", { batchMs: 500, now: () => t });
      history.record("b");
      t = 100;
      history.undo();
      t = 200;
      history.redo();
      t = 300;
      history.record("c");
      // redo直後もmergeしない
      expect(history.undo()).toBe("b");
    });
  });

  describe("canUndo / canRedo", () => {
    it("初期状態は両方falseを返す", () => {
      const history = createHistory("");
      expect(history.canUndo()).toBe(false);
      expect(history.canRedo()).toBe(false);
    });

    it("recordするとcanUndoはtrue、canRedoはfalseのまま", () => {
      const history = createHistory("");
      history.record("a");
      expect(history.canUndo()).toBe(true);
      expect(history.canRedo()).toBe(false);
    });

    it("undoするとcanRedoがtrueになる", () => {
      const history = createHistory("");
      history.record("a");
      history.undo();
      expect(history.canUndo()).toBe(false);
      expect(history.canRedo()).toBe(true);
    });

    it("clearするとcanUndo/canRedo両方falseに戻る", () => {
      const history = createHistory("");
      history.record("a");
      history.undo();
      history.clear("x");
      expect(history.canUndo()).toBe(false);
      expect(history.canRedo()).toBe(false);
    });
  });

  describe("容量上限", () => {
    it("maxCharsを超えると最古のundoが捨てられ、その分は遡れない", () => {
      // 各recordで新バッチになるように batchMs=0 にする
      // 各patchはdel+ins合計10文字なので、maxChars=25なら3件目で頭が押し出される
      const history = createHistory("aaaaa", { batchMs: 0, maxChars: 25 });
      history.record("bbbbb"); // inverse: del "bbbbb" + ins "aaaaa" = 10文字
      history.record("ccccc"); // 累計20
      history.record("ddddd"); // 累計30 → 上限超え、先頭の"aaaaa"分が破棄される
      // 残るのは c→d, b→c の2 patchで、初期"aaaaa"には戻れない
      expect(history.undo()).toBe("ccccc");
      expect(history.undo()).toBe("bbbbb");
      expect(history.undo()).toBeUndefined();
    });

    it("上限内であれば履歴は保持される", () => {
      const history = createHistory("aaaaa", { batchMs: 0, maxChars: 100 });
      history.record("bbbbb");
      history.record("ccccc");
      expect(history.undo()).toBe("bbbbb");
      expect(history.undo()).toBe("aaaaa");
      expect(history.undo()).toBeUndefined();
    });
  });
});
