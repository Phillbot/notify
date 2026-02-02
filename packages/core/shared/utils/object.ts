/**
 * Performs a shallow comparison of two plain objects.
 *
 * @param a - First object
 * @param b - Second object
 * @returns True if both objects have the same keys and values
 */
export function isShallowEqualObject<T extends object>(a: T, b: T): boolean {
  if (a === b) return true;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => (a as any)[key] === (b as any)[key]);
}

/**
 * Flattens a nested object into a single-level object with dot-notated keys.
 *
 * @param obj - The object to flatten
 * @param prefix - Internal prefix for recursion
 * @returns A new flattened object
 */
export function flattenObject(obj: Record<string, any>, prefix = ""): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, prefixedKey));
      } else {
        acc[prefixedKey] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );
}

/**
 * Checks whether a nested key exists in an object using dot notation.
 *
 * @param obj - The object to check
 * @param path - Dot-notated path string (e.g., "a.b.c")
 * @returns True if the nested key exists
 */
export function hasNestedKey(obj: object, path: string): boolean {
  return path.split(".").every((key) => {
    if (typeof obj === "object" && obj !== null && key in obj) {
      obj = (obj as any)[key];
      return true;
    }
    return false;
  });
}

/**
 * Recursively freezes an object, making it immutable.
 *
 * @param obj - The object to freeze
 * @returns The frozen object
 */
export function deepFreeze<T>(obj: T): T {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}
