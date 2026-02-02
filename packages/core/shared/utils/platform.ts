import { isBrowser } from "handy-ts-tools";

/**
 * Checks if the device is likely a mobile device based on user agent.
 */
export function isMobile(): boolean {
  if (!isBrowser()) return false;
  return /Mobi|Android/i.test(navigator.userAgent);
}

/**
 * Checks if the device is likely a tablet based on user agent.
 */
export function isTablet(): boolean {
  if (!isBrowser()) return false;
  return /Tablet|iPad/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
}

/**
 * Checks if the device is running iOS.
 */
export function isIOS(): boolean {
  if (!isBrowser()) return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Checks if the device is an iPhone.
 */
export function isIPhone(): boolean {
  if (!isBrowser()) return false;
  return /iPhone/i.test(navigator.userAgent);
}

/**
 * Checks if the device is an iPad.
 */
export function isIPad(): boolean {
  if (!isBrowser()) return false;
  return /iPad/i.test(navigator.userAgent);
}

/**
 * Checks if the device is running Android.
 */
export function isAndroid(): boolean {
  if (!isBrowser()) return false;
  return /Android/i.test(navigator.userAgent);
}

/**
 * Checks if the platform is Windows.
 */
export function isWindows(): boolean {
  if (!isBrowser()) return false;
  return /Win/i.test(navigator.userAgent);
}

/**
 * Checks if the platform is macOS.
 */
export function isMacOS(): boolean {
  if (!isBrowser()) return false;
  return /Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent);
}

/**
 * Checks if the platform is Linux.
 */
export function isLinux(): boolean {
  if (!isBrowser()) return false;
  return /Linux/i.test(navigator.userAgent);
}

/**
 * Checks if the platform is Electron.
 */
export function isElectron(): boolean {
  if (!isBrowser()) return false;
  return /Electron/i.test(navigator.userAgent);
}
