import { supplementText } from "./supplementText";

describe("supplementText", () => {
  it("2値が一致するときは空文字を返す", () => {
    expect(supplementText(3, 3)).toBe("");
  });

  it("systemがvisualより大きいときは`データ長 N`を返す", () => {
    expect(supplementText(1, 7)).toBe("データ長 7");
  });

  it("systemがvisualより小さいときも差分があるので`データ長 N`を返す", () => {
    expect(supplementText(7, 1)).toBe("データ長 1");
  });
});
