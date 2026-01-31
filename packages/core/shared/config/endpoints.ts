/**
 * Centralized configuration for all application ports and endpoints.
 * This ensures consistency across all apps (Web, Mobile, Desktop, Server).
 */

/**
 * Server ports configuration
 */
export const PORTS = {
  /** Main HTTP server port */
  SERVER_HTTP: 3000,
  /** WebSocket server port */
  SERVER_WS: 3001,
  /** Web dev server port (Vite) */
  WEB_DEV: 5173,
  /** Mobile dev server port (Expo) */
  MOBILE_DEV: 8081,
} as const;

/**
 * API endpoints configuration
 */
export const ENDPOINTS = {
  /** Base HTTP API URL */
  API_BASE: `http://127.0.0.1:${PORTS.SERVER_HTTP}`,
  /** WebSocket URL for browser/emulator */
  WS_URL: `ws://localhost:${PORTS.SERVER_WS}`,
  /** WebSocket URL for physical device (replace with your local IP) */
  WS_URL_DEVICE: (localIp: string) => `ws://${localIp}:${PORTS.SERVER_WS}`,
} as const;

/**
 * Environment-specific endpoint resolver
 */
export function getWebSocketUrl(options?: {
  /** Use device IP for physical device testing */
  deviceIp?: string;
}): string {
  if (options?.deviceIp) {
    return ENDPOINTS.WS_URL_DEVICE(options.deviceIp);
  }

  // If we are in a browser environment, use current host
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    // For Electron or file protocols where hostname is empty
    if (!hostname) {
      return ENDPOINTS.WS_URL;
    }
    // For localhost, we keep it as is, but for IP-based access (e.g., --host),
    // we use the actual IP of the machine.
    return `ws://${hostname}:${PORTS.SERVER_WS}`;
  }

  return ENDPOINTS.WS_URL;
}
