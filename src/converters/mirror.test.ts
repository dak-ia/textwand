import { mirrorLeftRight, mirrorUpDown } from "./mirror";

// 全角かなに使う結合濁点
const CD = String.fromCodePoint(0x3099);
// 半角かなに使う濁点
const HD = String.fromCodePoint(0xff9e);

describe("mirrorLeftRight", () => {
  it("対応表にある文字を左右反転文字に置き換える", () => {
    expect(mirrorLeftRight("Ebc", false)).toBe("ꓱdɔ");
  });

  it("小文字aは左右反転(ɒ)に置き換わる", () => {
    expect(mirrorLeftRight("abcde", false)).toBe("ɒdɔbɘ");
  });

  it("小文字f g h j k p r s y zは置き換わり、自己対称のnはそのまま", () => {
    expect(mirrorLeftRight("fghjknprsyz", false)).toBe("ʇϱતἰʞnqɿꙅⴞs");
  });

  it("非対称ペアがある大文字(B C D E F G J K L N P Q R S Z)も置き換わる", () => {
    expect(mirrorLeftRight("BCDEFGJKLNPQRSZ", false)).toBe("ᗺↃᗡꓱꟻටᒐꓘ⅃ИꟼϘЯƧS");
  });

  it("自己対称の小文字はそのまま", () => {
    expect(mirrorLeftRight("ilmnotuvwx", false)).toBe("ilmnotuvwx");
  });

  it("自己対称の大文字はそのまま", () => {
    expect(mirrorLeftRight("AHIMOTUVWXY", false)).toBe("AHIMOTUVWXY");
  });

  it("対応表にない文字はそのまま", () => {
    expect(mirrorLeftRight("こんにちは 世界", false)).toBe("こんにちは 世界");
  });

  it("反転先の字を入れると元の字が返る", () => {
    expect(mirrorLeftRight("ꓱ", false)).toBe("E");
    expect(mirrorLeftRight("d", false)).toBe("b");
    expect(mirrorLeftRight(")", false)).toBe("(");
  });

  it("reverseOrder=trueなら文字の並び順が逆になる", () => {
    expect(mirrorLeftRight("Ebc", true)).toBe("ɔdꓱ");
  });

  it("複数行でreverseOrder=trueなら行の順序は変えず各行の中だけ逆にする", () => {
    expect(mirrorLeftRight("ab\nc", true)).toBe("dɒ\nɔ");
  });

  it("複数行でreverseOrder=falseなら改行も並びもそのまま", () => {
    expect(mirrorLeftRight("abc\nde", false)).toBe("ɒdɔ\nbɘ");
  });

  it("複数行の空行は維持される", () => {
    expect(mirrorLeftRight("a\n\nb", true)).toBe("ɒ\n\nd");
  });

  it("複数行でreverseOrder=trueなら各行が独立に反転される", () => {
    expect(mirrorLeftRight("abc\nde", true)).toBe("ɔdɒ\nɘb");
  });

  it("末尾の改行は行の順序が変わらないので末尾のまま", () => {
    expect(mirrorLeftRight("ab\n", true)).toBe("dɒ\n");
  });

  it("結合濁点は基底の字に付いたまま並び順が逆になる", () => {
    expect(mirrorLeftRight("か" + CD + "b", true)).toBe("dか" + CD);
  });

  it("半角カナの濁点は基底の字に付いたまま並び順が逆になる", () => {
    expect(mirrorLeftRight("ｶ" + HD + "b", true)).toBe("dｶ" + HD);
  });

  it("空文字はそのまま", () => {
    expect(mirrorLeftRight("", false)).toBe("");
    expect(mirrorLeftRight("", true)).toBe("");
  });

  it("対象/非対象/括弧の混在も各文字ごとに処理される", () => {
    expect(mirrorLeftRight("R(x)", false)).toBe("Я)x(");
  });

  it("記号も左右反転する(? & 括弧 斜線)", () => {
    expect(mirrorLeftRight("?&[]{}<>/\\", false)).toBe("⸮ꝸ][}{><\\/");
  });

  it("自己対称の記号(! .)はそのまま", () => {
    expect(mirrorLeftRight("!.", false)).toBe("!.");
  });

  it("数字にも対応する(2 3 4 5 6 7 9)", () => {
    expect(mirrorLeftRight("2345679", false)).toBe("SƐ𐊀2∂ߖρ");
  });

  it("数字0 1 8はそのまま", () => {
    expect(mirrorLeftRight("018", false)).toBe("018");
  });

  it("ZはSに、zはsになる", () => {
    expect(mirrorLeftRight("Zz", false)).toBe("Ss");
  });

  it("全角英字は半角に寄せて反転する", () => {
    expect(mirrorLeftRight("ｂｄｐｑ", false)).toBe("dbqp");
    expect(mirrorLeftRight("ａｃｅｙ", false)).toBe("ɒɔɘⴞ");
    expect(mirrorLeftRight("ＣＤＥＦＧ", false)).toBe("Ↄᗡꓱꟻට");
  });

  it("全角の自己対称大文字(Ａ Ｈ Ｉ Ｍ Ｏ Ｔ Ｕ)も半角になる", () => {
    expect(mirrorLeftRight("ＡＨＩＭＯＴＵ", false)).toBe("AHIMOTU");
  });

  it("全角ＺはSになる", () => {
    expect(mirrorLeftRight("Ｚ", false)).toBe("S");
  });

  it("全角の括弧と斜線は半角で入れ替わる", () => {
    expect(mirrorLeftRight("（）［］｛｝＜＞／＼", false)).toBe(")(][}{><\\/");
  });

  it("全角記号も半角に寄せて反転する", () => {
    expect(mirrorLeftRight("？＆", false)).toBe("⸮ꝸ");
  });

  it("全角の自己対称の記号は半角になり、対応表にない記号は全角のまま", () => {
    expect(mirrorLeftRight("！．＃％＠", false)).toBe("!.＃％＠");
  });

  it("全角数字は半角に寄せて反転する", () => {
    expect(mirrorLeftRight("０１２３４５６７８９", false)).toBe("01SƐ𐊀2∂ߖ8ρ");
  });

  it("全角で入力して2回反転しても全角と半角が混ざらない", () => {
    expect(mirrorLeftRight(mirrorLeftRight("１２３４５６７８９", false), false)).toBe("1Ƨ34S6789");
  });

  it("並び順を逆にしても括弧は内側を向く", () => {
    expect(mirrorLeftRight("（あ）", true)).toBe("(あ)");
    expect(mirrorLeftRight("あ（２）", true)).toBe("(S)あ");
  });

  it("全角と半角が混ざった入力も半角にそろう", () => {
    expect(mirrorLeftRight("ｂb１1", false)).toBe("dd11");
  });
});

describe("mirrorUpDown", () => {
  it("対応表にある文字を上下反転(180°回転)文字に置き換える", () => {
    expect(mirrorUpDown("bad", false)).toBe("qɐp");
  });

  it("小文字は上下反転の字に置き換わる", () => {
    expect(mirrorUpDown("abcdefg", false)).toBe("ɐqɔpǝɟᵷ");
    expect(mirrorUpDown("hijkmn", false)).toBe("ɥᴉṛʞɯu");
    expect(mirrorUpDown("rtuvwy", false)).toBe("ɹʇnʌʍʎ");
  });

  it("非対称な字(A ! ? . &)を置き換える", () => {
    expect(mirrorUpDown("A!?.&", false)).toBe("ꓯ¡¿˙⅋");
  });

  it("6と9は互いに入れ替わる", () => {
    expect(mirrorUpDown("69", false)).toBe("96");
  });

  it("数字0 1 8はそのまま", () => {
    expect(mirrorUpDown("018", false)).toBe("018");
  });

  it("数字にも対応する(2 3 4 5 7)", () => {
    expect(mirrorUpDown("23457", false)).toBe("↊↋߈Sㄥ");
  });

  it("非対称ペアがある大文字(A B C D E F G J K L M P Q R T U V W Y)も置き換わる", () => {
    expect(mirrorUpDown("ABCDEFGJKLMPQRTUVWY", false)).toBe("ꓯꓭↃᗡꓱᖵ⅁ᒋꓘ⅂ꟽԀÒꓤꞱՈΛM⅄");
  });

  it("横軸対称な字(C D E K)は180°回転すると左右反転と同じ形になる", () => {
    expect(mirrorUpDown("CDEK", false)).toBe(mirrorLeftRight("CDEK", false));
  });

  it("括弧類は180°回転で開きが逆になる", () => {
    expect(mirrorUpDown("([{<", false)).toBe(")]}>");
    expect(mirrorUpDown(")]}>", false)).toBe("([{<");
  });

  it("斜線は180°回転で自分自身に戻る", () => {
    expect(mirrorUpDown("/\\", false)).toBe("/\\");
  });

  it("自己対称の大文字はそのまま", () => {
    expect(mirrorUpDown("HINOSXZ", false)).toBe("HINOSXZ");
  });

  it("自己対称の小文字もそのまま(l o s x z)", () => {
    expect(mirrorUpDown("losxz", false)).toBe("losxz");
  });

  it("対応表にない文字はそのまま", () => {
    expect(mirrorUpDown("こんにちは 世界", false)).toBe("こんにちは 世界");
  });

  it("reverseOrder=trueなら文字の並び順が逆になる", () => {
    expect(mirrorUpDown("bad", true)).toBe("pɐq");
  });

  it("複数行でreverseOrder=trueなら行の順序も各行の中も逆にする", () => {
    expect(mirrorUpDown("ab\nc", true)).toBe("ɔ\nqɐ");
  });

  it("複数行の空行は維持される", () => {
    expect(mirrorUpDown("a\n\nb", true)).toBe("q\n\nɐ");
  });

  it("複数行でreverseOrder=trueなら各行が独立に反転されたうえで行の順序が逆になる", () => {
    expect(mirrorUpDown("ab\ncd", true)).toBe("pɔ\nqɐ");
  });

  it("末尾の改行は行の順序が逆になるので先頭に移る", () => {
    expect(mirrorUpDown("ab\n", true)).toBe("\nqɐ");
  });

  it("半角カナの濁点は基底の字に付いたまま並び順が逆になる", () => {
    expect(mirrorUpDown("ｶ" + HD + "b", true)).toBe("qｶ" + HD);
  });

  it("反転先の字を入れると元の字が返る", () => {
    expect(mirrorUpDown("ꓯ", false)).toBe("A");
    expect(mirrorUpDown("¡", false)).toBe("!");
  });

  it("全角英字は半角に寄せて反転する", () => {
    expect(mirrorUpDown("ｂｑｄｐｎｕＷ", false)).toBe("qbpdunM");
    expect(mirrorUpDown("ｍｗ", false)).toBe("ɯʍ");
    expect(mirrorUpDown("ＡＦＧＬＭＰＲＴＵＶＹ", false)).toBe("ꓯᖵ⅁⅂ꟽԀꓤꞱՈΛ⅄");
    expect(mirrorUpDown("ａｈｒｔｖｙ", false)).toBe("ɐɥɹʇʌʎ");
  });

  it("全角の自己対称大文字(Ｈ Ｉ Ｎ Ｏ Ｓ Ｘ Ｚ)も半角になる", () => {
    expect(mirrorUpDown("ＨＩＮＯＳＸＺ", false)).toBe("HINOSXZ");
  });

  it("全角の括弧は半角で入れ替わり、斜線は半角になる", () => {
    expect(mirrorUpDown("（）［］｛｝＜＞／＼", false)).toBe(")(][}{></\\");
  });

  it("全角記号も半角に寄せて反転する", () => {
    expect(mirrorUpDown("！？．＆", false)).toBe("¡¿˙⅋");
  });

  it("対応表にない全角記号は全角のまま", () => {
    expect(mirrorUpDown("＃％＠", false)).toBe("＃％＠");
  });

  it("全角と半角が混ざった入力も半角にそろう", () => {
    expect(mirrorUpDown("ｂb６6", false)).toBe("qq99");
  });

  it("並び順を逆にしても全角の括弧は半角で内側を向く", () => {
    expect(mirrorUpDown("（ａ）", true)).toBe("(ɐ)");
  });

  it("全角数字は半角に寄せて反転する", () => {
    expect(mirrorUpDown("０１２３４５６７８９", false)).toBe("01↊↋߈S9ㄥ86");
  });

  it("空文字はそのまま", () => {
    expect(mirrorUpDown("", false)).toBe("");
  });
});
