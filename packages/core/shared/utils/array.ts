/**
 * Checks whether the given array is empty.
 *
 * @param arr - The array to check
 * @returns True if the array has no elements
 */
export function isEmptyArray<T>(arr: T[]): boolean {
  return arr.length === 0;
}

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
 * Splits an array into chunks of a given size.
 *
 * @param arr - The array to split
 * @param size - The chunk size
 * @returns An array of chunks
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Removes duplicates from an array based on a selector function.
 *
 * @param arr - The array to process
 * @param selector - Function to extract comparison value
 * @returns A new array with unique items
 */
export function uniqBy<T>(arr: T[], selector: (item: T) => any): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const key = selector(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Groups an array into an object using a key selector.
 *
 * @param arr - The array to group
 * @param keySelector - Function to select the key
 * @returns A record of grouped arrays
 */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * Partitions an array into two groups based on a predicate.
 *
 * @param arr - The array to partition
 * @param predicate - Function to test each element
 * @returns A tuple: [items that match, items that don't match]
 */
export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  return arr.reduce<[T[], T[]]>(
    (acc, item) => {
      predicate(item) ? acc[0].push(item) : acc[1].push(item);
      return acc;
    },
    [[], []]
  );
}

/**
 * Removes all falsy values from an array.
 *
 * @param arr - The array to compact
 * @returns A new array without falsy values
 */
export function compact<T>(arr: (T | undefined | null | false | '' | 0)[]): T[] {
  return arr.filter(Boolean) as T[];
}
