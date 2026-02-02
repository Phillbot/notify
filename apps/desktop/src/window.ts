import path from "path";

import { BrowserWindow, NativeImage } from "electron";

// __dirname is available globally in CJS/Electron

export function createWindow(productName: string, version: string, icon?: string | NativeImage) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 500,
    title: `${productName} v${version}`,
    frame: false,
    icon: icon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // In production, the dist folder is used. In dev, we use public relative to project root.
  const htmlPath = path.join(__dirname, "..", "public", "index.html");
  win.loadFile(htmlPath);
  win.setTitle(`${productName} v${version}`);

  win.on("closed", () => {
    // Handling window close via main.ts listener
  });

  return win;
}
