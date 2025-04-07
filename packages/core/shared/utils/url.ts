/**
 * Returns the value of a query parameter from a given URL.
 * @param url - The full URL string.
 * @param key - The name of the query parameter to retrieve.
 */
export function getQueryParam(url: string, key: string): string | null {
  const params = new URL(url).searchParams;
  return params.get(key);
}

/**
 * Appends or updates a query parameter in a URL.
 * @param url - The base URL.
 * @param key - The query parameter name.
 * @param value - The query parameter value.
 * @returns The updated URL string.
 */
export function setQueryParam(url: string, key: string, value: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set(key, value);
  return parsed.toString();
}

/**
 * Removes a query parameter from a URL.
 * @param url - The full URL string.
 * @param key - The query parameter name to remove.
 */
export function removeQueryParam(url: string, key: string): string {
  const parsed = new URL(url);
  parsed.searchParams.delete(key);
  return parsed.toString();
}

/**
 * Parses a URL and returns its components.
 * @param url - The URL string to parse.
 */
export function parseUrl(url: string): URL {
  return new URL(url);
}

/**
 * Converts a plain object into a URL query string.
 * @param params - An object representing query parameters.
 */
export function objectToQueryString(params: Record<string, string | number | boolean | undefined | null>): string {
  return Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
}

/**
 * Converts a query string into a plain object.
 * @param queryString - The query string to parse (e.g., '?foo=1&bar=2').
 */
export function queryStringToObject(queryString: string): Record<string, string> {
  const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  const result: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(query)) {
    result[key] = value;
  }
  return result;
}
