import { Clipboard } from './';

declare global {
  interface Window {
    api: {
      orderClipboard: () => void;
      deliverClipboard: (action: (histories: Clipboard[]) => void) => void;
      pasteClipboard: (index: number, asPlainText = false) => void;
      removeClipboard: (index: number) => void;
      showEditMenu: (
        pasteAction: (asPlainText?: boolean) => void,
        removeAction: () => void
      ) => void;
      pressKey: (key: string, shiftKey: boolean) => void;
      closeWindow: () => void;
    };
  }
}
