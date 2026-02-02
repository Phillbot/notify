import path from "path";
import fs from "fs";

import { Tray, Menu, BrowserWindow, nativeImage } from "electron";

// __dirname is available globally in CJS/Electron

export function createTray(mainWindow: BrowserWindow | null) {
  // Use a proper icon path. In distribution, it should be in public.
  const iconPath = path.join(__dirname, "..", "public", "notify-logo.png");

  let trayIcon;
  if (fs.existsSync(iconPath)) {
    trayIcon = nativeImage.createFromPath(iconPath);
  } else {
    console.warn(`⚠️ Tray icon not found at ${iconPath}. Using empty icon.`);
    // Create an empty 16x16 icon to prevent crash
    trayIcon = nativeImage.createEmpty();
  }

  const tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow?.show();
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        process.exit();
      },
    },
  ]);

  tray.setToolTip("Notify");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    mainWindow?.show();
  });

  return tray;
}
