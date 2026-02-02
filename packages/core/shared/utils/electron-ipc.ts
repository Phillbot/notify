import { isElectron } from "./platform";

/**
 * Interface for the Electron IPC renderer.
 * We use window.require to access it in the renderer process without declaring global types.
 */
interface IpcRenderer {
  send(channel: string, ...args: unknown[]): void;
}

interface ElectronWindow extends Window {
  require(module: "electron"): { ipcRenderer: IpcRenderer };
}

function getIpcRenderer(): IpcRenderer | null {
  if (!isElectron()) return null;

  try {
    return (window as unknown as ElectronWindow).require("electron").ipcRenderer;
  } catch (e) {
    console.error("Failed to acquire ipcRenderer:", e);
    return null;
  }
}

const ipc = getIpcRenderer();

/**
 * Shared utilities to control the Electron window from the renderer process.
 * This abstracts the IPC calls so components don't need to know about Electron details.
 */
export const electronWindowControls = {
  minimize: () => ipc?.send("window-minimize"),
  maximize: () => ipc?.send("window-maximize"),
  close: () => ipc?.send("window-close"),
};
