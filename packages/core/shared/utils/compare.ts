/**
 * Compares two values using strict equality.
 *
 * @param a - First value
 * @param b - Second value
 * @returns True if values are strictly equal
 */
export function compare<T>(a: T, b: T): boolean {
  return a === b;
}

/**
 * Checks if two arrays are shallowly equal (same elements in order).
 *
 * @param a - First array
 * @param b - Second array
 * @returns True if both arrays are shallowly equal
 */
export function isShallowEqualArray<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((item, i) => item === b[i]);
}
