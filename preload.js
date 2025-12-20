const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendWindowControl: (action) => ipcRenderer.send('window-control', action)
});
