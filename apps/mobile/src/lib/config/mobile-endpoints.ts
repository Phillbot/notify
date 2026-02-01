import Constants from "expo-constants";
import { Platform } from "react-native";

import { PORTS } from "~core/shared/config";

/**
 * Mobile-specific WebSocket URL configuration
 * Android emulator requires special IP 10.0.2.2 to access host machine.
 * Physical devices need the packager host IP.
 */
export function getMobileWebSocketUrl(): string {
  const host = Constants.expoConfig?.hostUri?.split(":")[0];

  if (Platform.OS === "android") {
    if (__DEV__ && !host) {
      // Android emulator uses 10.0.2.2 to access host's localhost
      console.log("🤖 Android Emulator detected - using 10.0.2.2 for WebSocket");
      return `ws://10.0.2.2:${PORTS.SERVER_WS}`;
    }
  }

  if (host) {
    console.log(`📱 Physical device/detected host - using ${host} for WebSocket`);
    return `ws://${host}:${PORTS.SERVER_WS}`;
  }

  // Fallback for iOS simulator or if host detection fails
  return `ws://localhost:${PORTS.SERVER_WS}`;
}
