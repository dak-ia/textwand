import { addDakuten, addHandakuten, removeDakuten, removeHandakuten } from "./dakuten";

// 全角かなに使う結合文字(Unicode正典)
const CD = "\u3099";
const CH = "\u309A";
// 半角かなに使う半角スペーシング
const HD = "\uFF9E";
const HH = "\uFF9F";
// 過去バージョンとの互換用マーク(スタンドアロン) — 入力側でしか使わない
const COMPAT_D = "\u309B";
const COMPAT_H = "\u309C";

describe("addDakuten (通常モード)", () => {
  it("対応表にある文字は通常の濁点付き文字に置き換える", () => {
    expect(addDakuten("かさたはう", false)).toBe("がざだばゔ");
  });

  it("対応表にない文字は濁点マークを合成する", () => {
    expect(addDakuten("あなま", false)).toBe(`あ${CD}な${CD}ま${CD}`);
  });

  it("カタカナも対応する", () => {
    expect(addDakuten("カサタハウ", false)).toBe("ガザダバヴ");
  });

  it("カタカナで対応表にないものは合成する", () => {
    expect(addDakuten("アナマ", false)).toBe(`ア${CD}ナ${CD}マ${CD}`);
  });

  it("ワ行の拡張カナ(ヷヸヹヺ)は既濁点済みとしてスキップし、ワ行から通常文字化する", () => {
    expect(addDakuten("ワヰヱヲ", false)).toBe("ヷヸヹヺ");
    expect(addDakuten("ヷヸヹヺ", false)).toBe("ヷヸヹヺ");
  });

  it("既存の濁点付き文字はそのまま", () => {
    expect(addDakuten("がだヴ", false)).toBe("がだヴ");
  });

  it("既存の半濁点付き文字はスキップする", () => {
    expect(addDakuten("ぱぴパ", false)).toBe("ぱぴパ");
  });

  it("既に濁点マークが続く文字はスキップする", () => {
    expect(addDakuten(`か${CD}`, false)).toBe(`か${CD}`);
  });

  it("既に半濁点マークが続く文字はスキップする", () => {
    expect(addDakuten(`は${CH}`, false)).toBe(`は${CH}`);
  });

  it("互換: 過去バージョンのスタンドアロン(U+309B)が続く文字もスキップする", () => {
    expect(addDakuten(`か${COMPAT_D}`, false)).toBe(`か${COMPAT_D}`);
  });

  it("ひらがな/カタカナ以外はそのまま", () => {
    expect(addDakuten("abc 123、", false)).toBe("abc 123、");
  });

  it("空文字はそのまま", () => {
    expect(addDakuten("", false)).toBe("");
  });

  it("半角カタカナには半角結合濁点(\uFF9E)を付ける", () => {
    expect(addDakuten("ｶｷｸ", false)).toBe(`ｶ${HD}ｷ${HD}ｸ${HD}`);
  });

  it("半角カタカナで対応表がなくても半角結合濁点で合成する(ｱ→ｱ\uFF9E)", () => {
    expect(addDakuten("ｱｲｳ", false)).toBe(`ｱ${HD}ｲ${HD}ｳ${HD}`);
  });

  it("半角に既に結合濁点/半濁点が続いている場合はスキップする", () => {
    expect(addDakuten(`ｶ${HD}ﾊ${HH}`, false)).toBe(`ｶ${HD}ﾊ${HH}`);
  });

  it("全角と半角の混在は文字ごとに適切な結合文字を選ぶ", () => {
    expect(addDakuten("カｶあｱ", false)).toBe(`ガｶ${HD}あ${CD}ｱ${HD}`);
  });

  it("対象/非対象/既付与/カタカナが混在しても各文字ごとに処理される", () => {
    expect(addDakuten("Hello、あかがぱハ", false)).toBe(`Hello、あ${CD}ががぱバ`);
  });
});

describe("addDakuten (合成のみモード)", () => {
  it("対応表があっても全て濁点マークを合成する", () => {
    expect(addDakuten("あかさは", true)).toBe(`あ${CD}か${CD}さ${CD}は${CD}`);
  });

  it("カタカナも同様に合成する", () => {
    expect(addDakuten("アカ", true)).toBe(`ア${CD}カ${CD}`);
  });

  it("既付与の文字はスキップする", () => {
    expect(addDakuten("がぱ", true)).toBe("がぱ");
  });

  it("濁点マークが続く文字はスキップする", () => {
    expect(addDakuten(`か${CD}あ`, true)).toBe(`か${CD}あ${CD}`);
  });

  it("半角は合成のみモードでも常に半角結合濁点を付ける(1文字形が存在しないため)", () => {
    expect(addDakuten("ｶｱ", true)).toBe(`ｶ${HD}ｱ${HD}`);
  });
});

describe("addHandakuten (通常モード)", () => {
  it("は行は通常の半濁点付き文字に置き換える", () => {
    expect(addHandakuten("はひふへほ", false)).toBe("ぱぴぷぺぽ");
  });

  it("は行以外のかなは半濁点マークを合成する", () => {
    expect(addHandakuten("あかさ", false)).toBe(`あ${CH}か${CH}さ${CH}`);
  });

  it("カタカナは行も対応する", () => {
    expect(addHandakuten("ハヒフヘホ", false)).toBe("パピプペポ");
  });

  it("既存の濁点付き文字はスキップする", () => {
    expect(addHandakuten("がば", false)).toBe("がば");
  });

  it("既存の半濁点付き文字はそのまま", () => {
    expect(addHandakuten("ぱパ", false)).toBe("ぱパ");
  });

  it("既に濁点マークが続く文字はスキップする", () => {
    expect(addHandakuten(`か${CD}`, false)).toBe(`か${CD}`);
  });

  it("かな以外はそのまま", () => {
    expect(addHandakuten("abc、", false)).toBe("abc、");
  });

  it("空文字はそのまま", () => {
    expect(addHandakuten("", false)).toBe("");
  });

  it("半角ﾊ行は半角結合半濁点で合成する", () => {
    expect(addHandakuten("ﾊﾋﾌﾍﾎ", false)).toBe(`ﾊ${HH}ﾋ${HH}ﾌ${HH}ﾍ${HH}ﾎ${HH}`);
  });

  it("半角のﾊ行以外にも半角結合半濁点を付ける", () => {
    expect(addHandakuten("ｱｶ", false)).toBe(`ｱ${HH}ｶ${HH}`);
  });

  it("半角の既存半濁点/濁点はスキップする(半濁点付与時)", () => {
    expect(addHandakuten(`ﾊ${HH}ｶ${HD}`, false)).toBe(`ﾊ${HH}ｶ${HD}`);
  });

  it("は行/その他かな/既付与/カタカナが混在しても各文字ごとに処理される", () => {
    expect(addHandakuten("Hello、あはがぱハ", false)).toBe(`Hello、あ${CH}ぱがぱパ`);
  });
});

describe("addHandakuten (合成のみモード)", () => {
  it("は行も半濁点マークを合成する", () => {
    expect(addHandakuten("あはひ", true)).toBe(`あ${CH}は${CH}ひ${CH}`);
  });

  it("カタカナは行も合成する", () => {
    expect(addHandakuten("アハ", true)).toBe(`ア${CH}ハ${CH}`);
  });
});

describe("removeDakuten (通常モード)", () => {
  it("既存の濁点付き文字を基底に戻す", () => {
    expect(removeDakuten("がざだばゔ", false)).toBe("かさたはう");
  });

  it("カタカナも基底に戻す", () => {
    expect(removeDakuten("ガザダバヴ", false)).toBe("カサタハウ");
  });

  it("ワ行の拡張カナ(ヷヸヹヺ)もワ行に戻す", () => {
    expect(removeDakuten("ヷヸヹヺ", false)).toBe("ワヰヱヲ");
  });

  it("濁点マークは除去する", () => {
    expect(removeDakuten(`あ${CD}な${CD}ま${CD}`, false)).toBe("あなま");
  });

  it("既存の半濁点付き文字は触らない", () => {
    expect(removeDakuten("ぱぴパ", false)).toBe("ぱぴパ");
  });

  it("半濁点マークは触らない", () => {
    expect(removeDakuten(`あ${CH}`, false)).toBe(`あ${CH}`);
  });

  it("かな以外はそのまま", () => {
    expect(removeDakuten("abc、", false)).toBe("abc、");
  });

  it("空文字はそのまま", () => {
    expect(removeDakuten("", false)).toBe("");
  });

  it("半角結合濁点(\uFF9E)を除去する", () => {
    expect(removeDakuten(`ｶ${HD}ｷ${HD}`, false)).toBe("ｶｷ");
  });

  it("半角結合半濁点は残す(濁点除去時)", () => {
    expect(removeDakuten(`ﾊ${HH}`, false)).toBe(`ﾊ${HH}`);
  });

  it("全角の濁点付き文字と半角結合の混在も一度に濁点を取り除く", () => {
    expect(removeDakuten(`ガｶ${HD}ﾊ${HH}`, false)).toBe(`カｶﾊ${HH}`);
  });

  it("既存の濁点付き文字とマーク付き文字の混在も一度に除去する", () => {
    expect(removeDakuten(`Hello、あ${CD}ががぱバ`, false)).toBe("Hello、あかかぱハ");
  });

  it("互換: 過去バージョンのスタンドアロン(U+309B)も除去する", () => {
    expect(removeDakuten(`あ${COMPAT_D}な${COMPAT_D}`, false)).toBe("あな");
  });
});

describe("removeDakuten (合成のみモード)", () => {
  it("既存の濁点付き文字はそのまま残す", () => {
    expect(removeDakuten("がざだ", true)).toBe("がざだ");
  });

  it("濁点マークだけ除去する", () => {
    expect(removeDakuten(`あ${CD}な${CD}`, true)).toBe("あな");
  });

  it("既存の濁点付き文字とマーク付きが混在するときマーク付きのみ除去", () => {
    expect(removeDakuten(`が${CD}か${CD}`, true)).toBe(`がか`);
  });

  it("半角結合濁点は合成のみモードでも除去される(半角には1文字形が無いため実質同じ)", () => {
    expect(removeDakuten(`ｶ${HD}`, true)).toBe("ｶ");
  });
});

describe("removeHandakuten (通常モード)", () => {
  it("既存の半濁点付き文字を基底に戻す", () => {
    expect(removeHandakuten("ぱぴぷぺぽ", false)).toBe("はひふへほ");
  });

  it("カタカナも基底に戻す", () => {
    expect(removeHandakuten("パピプペポ", false)).toBe("ハヒフヘホ");
  });

  it("半濁点マークは除去する", () => {
    expect(removeHandakuten(`あ${CH}な${CH}`, false)).toBe("あな");
  });

  it("既存の濁点付き文字は触らない", () => {
    expect(removeHandakuten("がば", false)).toBe("がば");
  });

  it("濁点マークは触らない", () => {
    expect(removeHandakuten(`あ${CD}`, false)).toBe(`あ${CD}`);
  });

  it("かな以外はそのまま", () => {
    expect(removeHandakuten("abc、", false)).toBe("abc、");
  });

  it("空文字はそのまま", () => {
    expect(removeHandakuten("", false)).toBe("");
  });

  it("半角結合半濁点(\uFF9F)を除去する", () => {
    expect(removeHandakuten(`ﾊ${HH}ﾋ${HH}`, false)).toBe("ﾊﾋ");
  });

  it("互換: 過去バージョンのスタンドアロン(U+309C)も除去する", () => {
    expect(removeHandakuten(`あ${COMPAT_H}は${COMPAT_H}`, false)).toBe("あは");
  });

  it("半角結合濁点は残す(半濁点除去時)", () => {
    expect(removeHandakuten(`ｶ${HD}`, false)).toBe(`ｶ${HD}`);
  });

  it("既存の濁点付き文字とマーク付き文字の混在も一度に除去する", () => {
    expect(removeHandakuten(`Hello、あ${CH}ぱがぱパ`, false)).toBe("Hello、あはがはハ");
  });
});

describe("removeHandakuten (合成のみモード)", () => {
  it("既存の濁点付き文字はそのまま残す", () => {
    expect(removeHandakuten("ぱぴ", true)).toBe("ぱぴ");
  });

  it("半濁点マークだけ除去する", () => {
    expect(removeHandakuten(`あ${CH}な${CH}`, true)).toBe("あな");
  });
});
