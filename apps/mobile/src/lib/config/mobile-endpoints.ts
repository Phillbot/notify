import { Platform } from "react-native";

import { PORTS } from "~core/shared/config";

/**
 * Mobile-specific WebSocket URL configuration
 * Android emulator requires special IP 10.0.2.2 to access host machine
 */
export function getMobileWebSocketUrl(): string {
  if (Platform.OS === "android") {
    // Android emulator uses 10.0.2.2 to access host's localhost
    console.log("🤖 Android detected - using 10.0.2.2 for WebSocket");
    return `ws://10.0.2.2:${PORTS.SERVER_WS}`;
  }

  // iOS simulator can use localhost
  return `ws://localhost:${PORTS.SERVER_WS}`;
}
