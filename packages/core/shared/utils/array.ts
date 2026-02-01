/**
 * Returns the first element of an array or undefined.
 *
 * @param arr - The array to retrieve from
 * @returns The first element or undefined
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Returns the last element of an array or undefined.
 *
 * @param arr - The array to retrieve from
 * @returns The last element or undefined
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Creates a new array with only unique elements.
 *
 * @param arr - The array to deduplicate
 * @returns A new array with unique values
 */
export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Flattens an array of arrays one level deep.
 *
 * @param arr - The nested array
 * @returns A flattened array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Removes all falsy values from an array.
 *
 * @param arr - The array to compact
 * @returns A new array without falsy values
 */
export function compact<T>(arr: (T | undefined | null | false | "" | 0)[]): T[] {
  return arr.filter(Boolean) as T[];
}
