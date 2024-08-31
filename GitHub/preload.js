const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      try {
        ipcRenderer.send(channel, data);
      } catch (error) {
        console.error(`Failed to send IPC message on channel ${channel}:`, error);
      }
    },
    on: (channel, func) => {
      try {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      } catch (error) {
        console.error(`Failed to set IPC listener on channel ${channel}:`, error);
      }
    }
  }
});

