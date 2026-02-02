import path from "path";

import { app, BrowserWindow, Tray, nativeImage } from "electron";

import { createWindow } from "./window.js";
import { setupIpcHandlers } from "./ipc.js";
import { createTray } from "./tray.js";

interface AppState {
  mainWindow: BrowserWindow | null;
  tray: Tray | null;
}

const state: AppState = {
  mainWindow: null,
  tray: null,
};

interface AppWithLinuxMethods {
  setDesktopName(name: string): void;
}

// Set app name early
app.name = "Notify";
app.setName("Notify");

if (process.platform === "linux") {
  (app as unknown as AppWithLinuxMethods).setDesktopName("Notify");
  // Force WM_CLASS on Linux
  app.commandLine.appendSwitch("class", "Notify");
  app.commandLine.appendSwitch("name", "Notify");
}

async function init() {
  // Helps with taskbar grouping
  app.setAppUserModelId("com.notify.desktop");

  await app.whenReady();

  // In dev/prod, assets are in public folder relative to app path
  const iconPath = path.join(app.getAppPath(), "public", "notify-logo.png");
  const icon = nativeImage.createFromPath(iconPath);

  state.mainWindow = createWindow("Notify", app.getVersion(), icon);
  state.tray = createTray(state.mainWindow);

  setupIpcHandlers();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      state.mainWindow = createWindow("Notify", app.getVersion(), icon);
    }
  });
}

init().catch((err) => {
  console.error("Failed to start application:", err);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
