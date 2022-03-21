import { contextBridge, ipcRenderer } from 'electron';
import { Clipboard } from '~/@types';

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('api', {
  orderClipboard: () => {
    ipcRenderer.send('order:clipboard');
  },
  deliverClipboard: (action: (histories: Clipboard[]) => void) => {
    ipcRenderer.on('deliver:clipboard', (event, histories) =>
      action(histories)
    );
  },
  pasteClipboard: (index: number) => {
    ipcRenderer.send('paste:clipboard', index);
  },
  removeClipboard: (index: number) => {
    ipcRenderer.send('remove:clipboard', index);
  },
  showContextMenu: (pasteAction: () => void, removeAction: () => void) => {
    ipcRenderer.removeAllListeners('paste:context-menu');
    ipcRenderer.removeAllListeners('remove:context-menu');
    ipcRenderer.send('show:context-menu');
    ipcRenderer.on('paste:context-menu', pasteAction);
    ipcRenderer.on('remove:context-menu', removeAction);
  },
  closeWindow: () => {
    ipcRenderer.send('close:window');
  },
});
