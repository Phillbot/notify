/**
 * Generates a UUID v4 using crypto API.
 * Uses `crypto.randomUUID` if available, otherwise falls back to UUID generation using `Math.random`.
 * @returns A randomly generated UUID string.
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID(); // Browser and modern Node.js
  } else {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

/**
 * Generates a nanoid-like string using crypto-based randomness.
 * Uses `crypto.getRandomValues` for randomness if available.
 * @param size - Length of the ID (default is 21).
 * @returns A random string ID.
 */
export function generateNanoId(size = 21): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // Use crypto if available
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(size);
    crypto.getRandomValues(array);
    return Array.from(array, byte => chars[byte % chars.length]).join('');
  }

  // Fallback to Math.random() if crypto is not available
  let result = '';
  const charactersLength = chars.length;
  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Generates a unique ID with optional prefix using crypto or Math.random.
 * @param prefix - Optional prefix for the ID.
 * @returns A unique string ID with the given prefix.
 */
export function uniqueId(prefix = ''): string {
  const id = generateNanoId(16);
  return `${prefix}${id}`;
}
