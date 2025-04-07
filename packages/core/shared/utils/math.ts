/**
 * Clamps a number between a minimum and a maximum value.
 *
 * @param value - The number to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns The clamped number
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to a specific number of decimal places.
 *
 * @param value - The number to round
 * @param decimals - Number of decimal places (default is 2)
 * @returns The rounded number
 */
export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Returns true if the given value is a finite number.
 *
 * @param value - The value to check
 * @returns True if the value is a finite number
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Returns true if the given value is NaN.
 *
 * @param value - The value to check
 * @returns True if the value is NaN
 */
export function isNaNValue(value: unknown): boolean {
  return typeof value === 'number' && isNaN(value);
}

/**
 * Converts degrees to radians.
 *
 * @param degrees - The degrees value
 * @returns The corresponding value in radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 *
 * @param radians - The radians value
 * @returns The corresponding value in degrees
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calculates the sum of an array of numbers.
 */
export function sum(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0);
}

/**
 * Calculates the average (mean) of an array of numbers.
 */
export function average(values: number[]): number {
  return values.length === 0 ? 0 : sum(values) / values.length;
}

/**
 * Returns the minimum and maximum values in a number array.
 */
export function minMax(values: number[]): [number, number] {
  return [Math.min(...values), Math.max(...values)];
}

/**
 * Checks if a number falls within a range.
 *
 * @param value - The value to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @param inclusive - Whether to include the edges (default: true)
 */
export function between(value: number, min: number, max: number, inclusive = true): boolean {
  return inclusive ? value >= min && value <= max : value > min && value < max;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Rounds a number to a fixed number of decimal places.
 */
export function toFixedNumber(value: number, decimals: number): number {
  return parseFloat(value.toFixed(decimals));
}

/**
 * Calculates a modulo with support for negative numbers.
 */
export function modulo(a: number, b: number): number {
  return ((a % b) + b) % b;
}

/**
 * Linearly interpolates between two values based on t (0..1).
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Normalizes a value from range [min..max] into range [0..1].
 */
export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

/**
 * Calculates the distance between two 2D points.
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculates the angle (in radians) between two 2D points.
 */
export function angleBetween(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Checks if a number is even.
 */
export function isEven(n: number): boolean {
  return n % 2 === 0;
}

/**
 * Checks if a number is odd.
 */
export function isOdd(n: number): boolean {
  return !isEven(n);
}
