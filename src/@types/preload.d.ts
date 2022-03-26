import { Clipboard } from './';

declare global {
  interface Window {
    api: {
      orderClipboard: () => void;
      deliverClipboard: (action: (histories: Clipboard[]) => void) => void;
      pasteClipboard: (index: number, asPlainText = false) => void;
      removeClipboard: (index: number) => void;
      showContextMenu: (
        pasteAction: () => void,
        removeAction: () => void
      ) => void;
      pressKey: (key: string, shiftKey: boolean) => void;
      closeWindow: () => void;
    };
  }
}
