# textwand

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D25-brightgreen.svg)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/dynamic/json?url=https://gist.githubusercontent.com/dak-ia/b2ecbc542ed1e74fafcc4d18d32bdd03/raw/textwand-coverage.json&label=coverage&query=$.coverage&suffix=%25&color=brightgreen)](https://github.com/dak-ia/textwand/actions/workflows/jest-check.yml)

日本語テキストの文字数カウントと、全角半角・句読点・かな・大文字小文字などの相互変換ができるブラウザ完結のテキスト変換ツール。

## 公開先

https://dak-ia.github.io/textwand/

## 機能

- **文字数カウント**: 空白込み / 空白抜き × 全文字 / 全角のみの4種類を同時に表示
- **エディタ**: undo / redo (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z)、Tabキーでのタブ挿入、書式なしのプレーン貼り付け、リセット
- **全角ハイライト**: エディタ内の全角文字を強調表示
- **テーマ切替**: 自動 / ライト / ダーク
- **削除**: 全角空白 / 半角空白 / 改行 / タブ
- **変換**:
  - 大文字 ↔ 小文字
  - カタカナ ↔ ひらがな
  - 全角 ↔ 半角 (数字 / 英字 / カナ / 空白 / 記号)
  - 句読点 (`.` / `．` ↔ `。`、`,` / `，` ↔ `、`)。数字に挟まれた小数点 / 桁区切りをスキップするオプションあり
- **文字列置換**: 置換前と置換後の文字列を指定して一括置換

## 開発

```bash
npm install            # 依存をインストール

npm run dev            # 開発サーバーを起動
npm run build          # 型チェック + Viteビルド
npm run preview        # ビルド成果物をプレビュー

npm test               # 全テストを実行
npm run test:watch     # watchモードでテストを実行
npm run test:coverage  # カバレッジ付きでテストを実行

npm run lint           # ESLint
npm run lint:fix       # ESLint (自動修正)
npm run format         # Prettier (書き換え)
npm run format:check   # Prettier (チェックのみ)
```

## 経緯

もともと2021年に作ったが未公開で止まっていたツールを、2026年に機能修正とデザインを見直し、新規リポジトリで作り直している。

## ライセンス

MIT License

## 作者

[dak-ia](https://github.com/dak-ia)
