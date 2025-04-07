/**
 * Saves a value to localStorage.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store.
 */
export function saveToStorage(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from localStorage.
 * @param key - The key of the stored value.
 * @returns The parsed value or null if not found or parsing fails.
 */
export function getFromStorage<T = unknown>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

/**
 * Removes a specific item from localStorage.
 * @param key - The key to remove.
 */
export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

/**
 * Clears all keys from localStorage.
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}
