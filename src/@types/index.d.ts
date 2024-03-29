export type ClipTemp = Clipboard | Template;
export type Clipboard = {
  time: number;
  text: string;
};
export type Template = {
  time: number;
  title: string;
  text: string;
};

export type EditActions = 'paste' | 'add' | 'edit' | 'remove';
export type WindowEventType = 'reload' | 'settings' | EditActions;
export type WindowEvent = {
  type: WindowEventType;
  args: unknown[];
};

export type PasteMode = 'normal' | 'fifo';

export namespace Settings {
  export type theme = 'system' | 'light' | 'dark';
  export type position =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  export type items = {
    theme: theme;
    startup: boolean;
    clipboard: {
      maxsize: number;
      backup: boolean;
    };
    firstInFirstOut: {
      keepItems: boolean;
      position: position;
    };
  };
  export type option = {
    text: string;
    value: string;
  };
}
