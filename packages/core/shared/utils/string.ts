/**
 * Capitalizes the first letter of a string.
 * @param str - The input string.
 * @returns The string with the first letter capitalized.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to kebab-case.
 * @param str - The input string.
 * @returns The kebab-cased string.
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

/**
 * Truncates a string to a specified length and adds ellipsis if needed.
 * @param str - The input string.
 * @param maxLength - Maximum allowed length.
 * @returns The truncated string.
 */
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

/**
 * Removes HTML tags from a string.
 * @param str - The HTML string.
 * @returns The plain text string without HTML tags.
 */
export function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

/**
 * Slugifies a string for use in URLs.
 * @param str - The input string.
 * @returns The slugified string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
