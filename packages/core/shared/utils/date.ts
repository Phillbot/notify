/**
 * Returns the current date and time as an ISO string.
 */
export function getNowISO(): string {
  return new Date().toISOString();
}

/**
 * Formats a date to YYYY-MM-DD format.
 *
 * @param date - The date to format
 * @returns The formatted string
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Checks if a given date is today.
 *
 * @param date - The date to check
 * @returns True if the date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Adds days to a given date and returns a new date.
 *
 * @param date - The base date
 * @param days - Number of days to add
 * @returns New date with days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Calculates the difference in days between two dates.
 *
 * @param a - The first date
 * @param b - The second date
 * @returns Number of full days between the two dates
 */
export function differenceInDays(a: Date, b: Date): number {
  const diff = Math.abs(a.getTime() - b.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Converts a date to a human-readable format (e.g. "Jan 1, 2024").
 *
 * @param date - The date to format
 * @returns A formatted string
 */
export function formatReadableDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Checks if a given date is tomorrow.
 */
export function isTomorrow(date: Date): boolean {
  const tomorrow = addDays(new Date(), 1);
  return isSameDay(date, tomorrow);
}

/**
 * Checks if a date is in the past.
 */
export function isPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * Checks if a date is in the future.
 */
export function isFuture(date: Date): boolean {
  return date.getTime() > Date.now();
}

/**
 * Checks if two dates fall on the same day.
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

/**
 * Returns the start of the day (00:00:00) for a given date.
 */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Returns the end of the day (23:59:59.999) for a given date.
 */
export function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

/**
 * Converts a date to a Unix timestamp (in seconds).
 */
export function toUnix(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Converts a Unix timestamp (in seconds) to a Date object.
 */
export function fromUnix(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

/**
 * Safely parses a string into a Date. Returns null if invalid.
 */
export function parseDate(input: string): Date | null {
  const date = new Date(input);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Returns a human-readable relative time string (e.g., "2 minutes ago").
 */
export function getTimeAgo(date: Date, mode: 'strict' | 'approx' = 'strict'): string {
  let seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const baseIntervals: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
  ];

  const strictIntervals: [number, string][] = [
    ...baseIntervals,
    [4, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  const approxIntervals: [number, string][] = [
    ...baseIntervals,
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  const intervals = mode === 'approx' ? approxIntervals : strictIntervals;

  let i = 0;
  while (seconds >= intervals[i][0] && i < intervals.length - 1) {
    seconds /= intervals[i][0];
    i++;
  }

  const count = Math.floor(seconds);
  const label = intervals[i][1] + (count !== 1 ? 's' : '');
  return `${count} ${label} ago`;
}
