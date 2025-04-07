/**
 * Throws an error if the given value is null or undefined.
 *
 * @param value - The value to check
 * @param message - Optional error message
 * @returns The non-null, non-undefined value
 */
export function assertDefined<T>(value: T, message?: string): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message ?? 'Expected value to be defined, but received null or undefined.');
  }
  return value as NonNullable<T>;
}

/**
 * Throws an error if the condition is false.
 *
 * @param condition - The condition to check
 * @param message - Optional error message
 */
export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? 'Assertion failed');
  }
}

/**
 * Asserts that a code path should never be reachable.
 * Useful for exhaustive type checks.
 *
 * @param value - The unexpected value
 * @param message - Optional error message
 */
export function assertNever(value: never, message?: string): never {
  throw new Error(message ?? `Unexpected value: ${String(value)}`);
}
