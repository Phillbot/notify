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
