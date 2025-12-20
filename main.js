const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs'); // fsモジュールを追加

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // ウィンドウのフレームを非表示にする
    autoHideMenuBar: true, // メニューバーを自動的に隠す
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'), // preloadスクリプトを再度追加
    },
  });

  mainWindow.loadURL('https://timetreeapp.com');

  mainWindow.webContents.on('did-finish-load', () => {
    // DarkReaderのバンドルファイルを読み込み
    const darkreaderBundle = fs.readFileSync(
      path.join(__dirname, 'darkreader.bundle.js'),
      'utf8'
    );

    // ページにDarkReaderを注入し、Dynamic Modeを有効にする
    try {
      mainWindow.webContents.executeJavaScript(`
        (() => {
          const script = document.createElement('script');
          script.textContent = ${JSON.stringify(darkreaderBundle)};
          document.documentElement.appendChild(script);

          // システムのテーマ設定に合わせてDarkReaderを有効/無効にする関数
          window.applyDarkReaderTheme = (isDark) => {
            if (isDark) {
              // ★ これが無いと必ず壊れる
              DarkReader.setFetchMethod(window.fetch);

              DarkReader.enable({
                mode: 1, // Dynamic Mode
                brightness: 110,
                contrast: 90,
                sepia: 0
              });
            } else {
              DarkReader.disable();
            }
          };

          // ロード完了時の初期テーマ適用
          window.applyDarkReaderTheme(${nativeTheme.shouldUseDarkColors});
        })();
      `).catch(error => console.error('DarkReader executeJavaScript error in renderer:', error));
    } catch (e) {
      console.error('Error injecting DarkReader script:', e);
    }

    // Dark Readerが誤認識するオーバーレイのCSSを無効化
    mainWindow.webContents.insertCSS(`
      /* モーダル背景の暗幕を無効化 */
      [role="dialog"]::before,
      .ReactModal__Overlay,
      .modal-overlay,
      div[style*="rgba(0, 0, 0"] {
        background-color: rgba(0,0,0,0.35) !important;
        filter: none !important;
      }
    `).catch(console.error); // insertCSSのpromiseもcatch

    // カスタムタイトルバーのHTMLを注入
    try {
      mainWindow.webContents.executeJavaScript(`
        const titleBarHtml = ${JSON.stringify(`
          <div id="custom-title-bar">
            <div class="title-bar-buttons-left">
              <button id="close-btn" class="mac-button mac-close" title="閉じる"></button>
              <button id="minimize-btn" class="mac-button mac-minimize" title="最小化"></button>
              <button id="maximize-restore-btn" class="mac-button mac-maximize" title="最大化/元に戻す"></button>
            </div>
            <div class="title-bar-title"></div>
            <div class="title-bar-drag-region-right"></div>
          </div>
        `)};
        document.body.insertAdjacentHTML('afterbegin', titleBarHtml);

        // ボタンのイベントリスナーを設定
        document.getElementById('minimize-btn').addEventListener('click', () => {
          window.electronAPI.sendWindowControl('minimize');
        });
        document.getElementById('maximize-restore-btn').addEventListener('click', () => {
          window.electronAPI.sendWindowControl('maximize-restore');
        });
        document.getElementById('close-btn').addEventListener('click', () => {
          window.electronAPI.sendWindowControl('close');
        });

        // ページのタイトルをカスタムタイトルバーに表示
        const titleBarTitle = document.querySelector('.title-bar-title');
          titleBarTitle.textContent = document.title + ' Desktop Mod Created by @nisesimadao';

          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.target.nodeName === 'TITLE') {
                titleBarTitle.textContent = document.title + ' Desktop Mod Created by @nisesimadao';
              }
            });
          });

          // <head> 要素内の <title> タグを監視
          const titleElement = document.querySelector('head > title');
          if (titleElement) {
            observer.observe(titleElement, { childList: true, subtree: true, characterData: true });
          } else {
            // titleタグがない場合、body要素全体を監視する（パフォーマンスは劣る）
            // より堅牢にするには、preloadスクリプトでipcRendererを使ってメインプロセスからタイトルを受け取る方法も検討
            observer.observe(document.body, { childList: true, subtree: true, characterData: true });
          }
      `).catch(error => console.error('Custom Title Bar executeJavaScript error in renderer:', error));
    } catch (e) {
      console.error('Error injecting Custom Title Bar script:', e);
    }

    // カスタムタイトルバーのCSSを注入
    mainWindow.webContents.insertCSS(`
      #custom-title-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 36px; /* タイトルバーの高さ */
        background-color: #2e2e2e; /* デフォルトの背景色（ダークモードでDarkReaderが調整） */
        color: #ffffff; /* デフォルトの文字色（ダークモードでDarkReaderが調整） */
        display: flex;
        justify-content: center; /* タイトルを中央揃えにする */
        align-items: center;
        z-index: 9999; /* 他のコンテンツの上に表示 */
        -webkit-app-region: drag; /* ウィンドウをドラッグ可能にする */
        font-family: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
      }
      body { /* <- これを追加 */
        padding-top: 36px !important; /* タイトルバーの高さ分だけ下にずらす */
      }

      .title-bar-drag-region-left {
        flex-grow: 0; /* 左側ドラッグ領域は幅を占有しない */
        height: 100%;
        -webkit-app-region: drag;
        /* width: 60px; */ /* この行はすでに削除済み */
      }

      .title-bar-buttons-left {
        position: absolute; /* 絶対配置 */
        left: 0; /* 左端に配置 */
        height: 100%; /* 親要素の高さに合わせる */
        z-index: 1; /* 他の要素より手前に表示 */
        display: flex;
        -webkit-app-region: no-drag;
        padding-left: 10px;
        gap: 8px;
        align-items: center;
      }

      .mac-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        background-color: #ccc;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .mac-close {
        background-color: #ff5f56;
      }

      .mac-minimize {
        background-color: #ffbd2e;
      }

      .mac-maximize {
        background-color: #27c93f;
      }

      .mac-button:hover::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .title-bar-title {
        flex-grow: 0.8;
        text-align: center;
        font-size: 13px;
        -webkit-app-region: drag;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 50px; /* タイトルがボタンに近すぎないようにパディングを追加 */
      }

      .title-bar-drag-region-right {
        position: absolute; /* 絶対配置 */
        right: 0; /* 右端に配置 */
        height: 100%; /* 親要素の高さに合わせる */
        display: flex;
        -webkit-app-region: no-drag;
        padding-right: 8px;
        gap: 8px;
        align-items: center;
      }
    `).catch(console.error);

    // ウェブコンテンツ全体のフォントを変更
    mainWindow.webContents.insertCSS(`
      html, body {
        font-family: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif !important;
      }
    `).catch(console.error);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // ウィンドウ操作のIPCハンドラ
  ipcMain.on('window-control', (event, action) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    if (win) {
      if (action === 'minimize') {
        win.minimize();
      } else if (action === 'maximize-restore') {
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      } else if (action === 'close') {
        win.close();
      }
    }
  });

  // システムのテーマ設定が変更された際にDarkReaderを更新
  nativeTheme.on('updated', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      // ページ内の関数を呼び出してテーマを更新
      mainWindow.webContents.executeJavaScript(
        `window.applyDarkReaderTheme(${nativeTheme.shouldUseDarkColors});`
      ).catch(console.error);
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
