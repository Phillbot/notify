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
 * Creates a comparator function for sorting by a selected field.
 *
 * @param selector - Function to select the comparison value
 * @param ascending - Sort order (true for ascending, false for descending)
 * @returns A comparator function for Array.prototype.sort
 */
export function createComparator<T>(
  selector: (item: T) => number | string,
  ascending: boolean = true
): (a: T, b: T) => number {
  return (a, b) => {
    const aVal = selector(a);
    const bVal = selector(b);
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  };
}

/**
 * Reverses an existing comparator function.
 *
 * @param comparator - The comparator to reverse
 * @returns A reversed comparator
 */
export function reverseComparator<T>(
  comparator: (a: T, b: T) => number
): (a: T, b: T) => number {
  return (a, b) => comparator(b, a);
}

/**
 * Chains multiple comparators together in order of precedence.
 *
 * @param comparators - List of comparator functions
 * @returns A chained comparator that applies all provided ones
 */
export function chainComparators<T>(
  ...comparators: Array<(a: T, b: T) => number>
): (a: T, b: T) => number {
  return (a, b) => {
    for (const compare of comparators) {
      const result = compare(a, b);
      if (result !== 0) return result;
    }
    return 0;
  };
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
