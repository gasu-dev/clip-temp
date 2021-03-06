import {
  app,
  Menu,
  MenuItemConstructorOptions as MenuItemOptions,
  WebContents,
  nativeTheme,
  ipcMain,
} from 'electron';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

const createMenuTemplate = (sender: WebContents): MenuItemOptions[] => [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        role: 'quit',
      },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    submenu: createEditMenuTemplate(sender),
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'F5',
        click: () => sender.send('store:window-event', 'reload'),
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'F12',
        role: 'toggleDevTools',
      },
      { type: 'separator' },
      {
        label: 'Actual Size',
        accelerator: 'CommandOrControl+0',
        role: 'resetZoom',
      },
      {
        label: 'Zoom In',
        accelerator: 'CommandOrControl+Plus',
        role: 'zoomIn',
      },
      {
        label: 'Zoom Out',
        accelerator: 'CommandOrControl+-',
        role: 'zoomOut',
      },
      { type: 'separator' },
      {
        label: 'Toggle Full Screen',
        accelerator: 'F11',
        role: 'togglefullscreen',
      },
    ],
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Theme',
        submenu: createThemeMenu(),
      },
      {
        label: 'Minimize',
        accelerator: 'CommandOrControl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CommandOrControl+W',
        role: 'close',
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        role: 'about',
      },
    ],
  },
];

const createEditMenuTemplate = (
  sender: WebContents,
  editable: ('paste' | 'edit' | 'delete')[] = []
): MenuItemOptions[] => [
  {
    label: 'Paste',
    accelerator: 'Enter',
    click: () => sender.send('store:window-event', 'paste'),
    enabled: editable.includes('paste'),
  },
  {
    label: 'Edit',
    click: () => sender.send('store:window-event', 'edit'),
    enabled: editable.includes('edit'),
  },
  {
    label: 'Delete',
    accelerator: 'Delete',
    click: () => sender.send('store:window-event', 'remove'),
    enabled: editable.includes('delete'),
  },
];

ipcMain.on(
  'change:editable',
  (event, editable: ('paste' | 'edit' | 'delete')[]) => {
    const menu = Menu.getApplicationMenu();
    if (menu === null) return;
    const editMenu = menu.getMenuItemById('edit');
    if (editMenu === null || !editMenu.submenu) return;
    editMenu.submenu.items.forEach((item) => {
      const label = item.label.toLowerCase();
      item.enabled = editable.includes(label as never);
    });
  }
);

const createThemeMenu = (): MenuItemOptions[] => {
  const themeMenu = [
    {
      id: 'theme-system',
      label: 'System',
      type: 'checkbox' as const,
      checked: nativeTheme.themeSource === 'system',
      click: () => changeTheme('system'),
    },
    {
      id: 'theme-light',
      label: 'Light',
      type: 'checkbox' as const,
      checked: nativeTheme.themeSource === 'light',
      click: () => changeTheme('light'),
    },
    {
      id: 'theme-dark',
      label: 'Dark',
      type: 'checkbox' as const,
      checked: nativeTheme.themeSource === 'dark',
      click: () => changeTheme('dark'),
    },
  ];
  const changeTheme = (theme: 'system' | 'light' | 'dark') => {
    nativeTheme.themeSource = theme;
    const menu = Menu.getApplicationMenu();
    if (menu === null) return;
    for (const item of ['system', 'light', 'dark']) {
      const menuItem = menu.getMenuItemById(`theme-${item}`);
      if (menuItem === null) continue;
      menuItem.checked = theme === item;
    }
  };
  return themeMenu;
};

export const createAppMenu = (sender: WebContents): Menu => {
  app.setAboutPanelOptions({
    applicationName: 'clip-temp',
    applicationVersion: 'Version: 0.7.0',
    copyright: 'Copyright ?? 2022 freeApplications',
    iconPath: isDevelopment
      ? 'public/icon.png'
      : path.join(__dirname, 'icon.png'),
  });
  return Menu.buildFromTemplate(createMenuTemplate(sender));
};

export const createContextMenu = (
  sender: WebContents,
  editable: ('paste' | 'edit' | 'delete')[]
): Menu => {
  return Menu.buildFromTemplate(createEditMenuTemplate(sender, editable));
};
