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
 * Returns true if the given value is NaN.
 */
export function isNaNValue(value: unknown): boolean {
  return typeof value === "number" && isNaN(value);
}
