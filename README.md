# TimeTree Desktop

## 概要

TimeTree Desktop は、カレンダーサービス TimeTree の Web 版をデスクトップアプリとして利用するための Electron アプリです。Web 版の機能をそのまま利用しながら、カスタムタイトルバー、ページタイトルの表示、システム外観に合わせたダークモードなど、デスクトップ向けの表示を追加します。

## プレビュー

### Windows

<img width="1800" height="1200" alt="Windows 版のプレビュー、ダークモード" src="https://github.com/user-attachments/assets/0a64bc1a-5dc7-4e80-a1c7-025884c584e4" />
<img width="900" height="604" alt="Windows 版のプレビュー、ライトモード" src="https://github.com/user-attachments/assets/495c048d-6155-4ed0-bc2e-59ee0128f952" />

### macOS

<img width="1312" height="912" alt="macOS 版のプレビュー、ダークモード" src="https://github.com/user-attachments/assets/8a3ed6f1-60dd-4e6b-869a-ce5d8dee151f" />
<img width="1312" height="912" alt="macOS 版のプレビュー、ライトモード" src="https://github.com/user-attachments/assets/e94334b2-1ba5-47fe-a0d2-bbdb79d94f21" />

## 機能

- **カスタムタイトルバー**：標準のウィンドウフレームを置き換え、デスクトップアプリ向けの見た目にします。
- **ページタイトルの表示**：現在表示している Web ページのタイトルをタイトルバーへ反映します。
- **フォント調整**：アプリ内の表示をデスクトップ環境になじむよう調整します。
- **デスクトップ向け UI**：Web コンテンツをカスタムタイトルバーの直下に表示します。
- **Dark Reader 連携**：システムのダークモード設定に応じて Dark Reader を切り替え、Web コンテンツの配色も変更します。

## インストール

### 前提条件

ソースから実行する場合は、次のソフトウェアが必要です。

- Node.js と npm、または Yarn
- Git

### 配布版を使う

1. [GitHub Releases](https://github.com/nisesimadao/TimeTreeDesktop/releases/) から、利用する OS 向けの配布物をダウンロードします。
2. Windows ではインストーラーを実行します。macOS ではディスクイメージを開き、アプリを Applications フォルダへコピーします。

### ソースから実行する

```bash
git clone https://github.com/nisesimadao/TimeTreeDesktop.git
cd TimeTreeDesktop
npm install
npm start
```

Yarn を使う場合は、`npm install` / `npm start` の代わりに `yarn install` / `yarn start` を使用できます。

起動すると、TimeTree の Web 版がデスクトップウィンドウ内に表示されます。

## 注意

TimeTree Desktop は TimeTree 公式のデスクトップアプリではありません。Web 版 TimeTree の仕様変更により、表示や一部機能が動作しなくなる可能性があります。

## クレジット

Created by @nisesimadao
