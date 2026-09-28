# TimeTree Desktop

## 概要

TimeTree Desktop は、カレンダーサービス TimeTree の Web 版をデスクトップアプリとして利用するための Electron アプリです。
Web 版の機能を利用しながら、カスタムタイトルバー、ページタイトルの表示、システムフォントとの統合など、デスクトップ向けの表示を追加します。

## プレビュー

### Windows 版

<img width="1800" height="1200" alt="Windows版のプレビュー、ダークモード" src="https://github.com/user-attachments/assets/0a64bc1a-5dc7-4e80-a1c7-025884c584e4" />
<img width="900" height="604" alt="Windows版のプレビュー、ライトモード" src="https://github.com/user-attachments/assets/495c048d-6155-4ed0-bc2e-59ee0128f952" />

### Mac 版

<img width="1312" height="912" alt="Mac版のプレビュー、ダークモード" src="https://github.com/user-attachments/assets/8a3ed6f1-60dd-4e6b-869a-ce5d8dee151f" />
<img width="1312" height="912" alt="Mac版のプレビュー、ライトモード" src="https://github.com/user-attachments/assets/e94334b2-1ba5-47fe-a0d2-bbdb79d94f21" />

## 機能

- **macOS 風のカスタムタイトルバー**：macOS 版では、最小化、最大化または元に戻す、閉じる操作を赤、黄、緑のボタンで表示します。
- **ページタイトルの表示**：現在表示している Web ページのタイトルをタイトルバーへ反映します。
- **ヒラギノ角ゴシックの適用**：アプリ内のフォントをヒラギノ角ゴシックへ統一します。
- **デスクトップ向け UI**：標準のウィンドウフレームを隠し、Web コンテンツをカスタムタイトルバーの直下に表示します。
- **Dark Reader 連携**：システムのダークモード設定に応じて Dark Reader を有効または無効にし、Web コンテンツの配色も切り替えます。

## インストール

### 前提条件

ソースから実行する場合は、次のソフトウェアが必要です。

- Node.js と npm、または Yarn。
- Git。

### 方法 1：配布版を使う

1. [GitHub Releases](https://github.com/opevista/TimeTreeDesktop/releases/) から、インストーラーまたはディスクイメージをダウンロードします。
2. Windows ではインストーラーを実行します。
   macOS ではディスクイメージを開き、アプリを Applications フォルダへコピーします。

### 方法 2：ソースから実行する

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/opevista/TimeTreeDesktop.git
   cd TimeTreeDesktop
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   # または
   # yarn install
   ```

## 使い方

### 配布版

インストールまたは展開した実行ファイルを起動します。

### ソースから起動

プロジェクトのルートディレクトリで次のコマンドを実行します。

```bash
npm start
# または
# yarn start
```

TimeTree Desktop が起動し、TimeTree の Web 版をデスクトップウィンドウ内に表示します。

## クレジット

Created by @nisesimadao
