import {
  Clipboard,
  Template,
  WindowEventType,
  EditActions,
  Settings,
} from './';

declare global {
  interface Window {
    api: {
      // clipboard
      orderClipboard: () => void;
      deliverClipboard: (action: (histories: Clipboard[]) => void) => void;
      pasteClipboard: (index: number) => void;
      removeClipboard: (index: number) => void;
      deliverFirstInFirstOut: (
        action: (firstInFirstOUt: string[]) => void
      ) => void;
      getFirstInFirstOut: () => Promise;
      getFirstInFirstOutRepeat: () => Promise;
      toggleFirstInFirstOutRepeat: () => void;
      // template
      saveTemplate: (
        index: number | string,
        title: string,
        text: string
      ) => void;
      orderTemplate: () => void;
      deliverTemplate: (action: (templates: Template[]) => void) => void;
      getTemplate: (index: number) => Promise;
      pasteTemplate: (index: number) => void;
      removeTemplate: (index: number) => void;
      // settings
      getSettings: () => Promise;
      changeTheme: (theme: Settings.Theme) => void;
      changeStartup: (startup: boolean) => void;
      changeClipboardMaxsize: (maxsize: number) => void;
      changeClipboardBackup: (backup: boolean) => void;
      changeFirstInFirstOutKeepItems: (keepItems: boolean) => void;
      changeFirstInFirstOutPosition: (position: Settings.position) => void;
      closeSettings: () => void;
      // window
      showEditMenu: (editable: EditActions[]) => void;
      changeEditable: (editable: EditActions[]) => void;
      pressKey: (key: string, shiftKey: boolean) => void;
      closeMainWindow: () => void;
      storeWindowEvent: (
        action: (type: WindowEventType, ...args: unknown[]) => void
      ) => void;
      showFirstInFirstOutMenu: (index: number) => void;
      resizeAndRepositionSubWindow: (height?: number) => void;
      closeSubWindow: () => void;
    };
  }
}
