/**
 * Encodes an SVG string to a base64-encoded data URL.
 * @param svg - The raw SVG string.
 */
export function encodeSvgToBase64(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

/**
 * Encodes an SVG string to a URI-safe data URL.
 * @param svg - The raw SVG string.
 */
export function encodeSvgToUri(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generates an inline SVG data URL from a raw SVG string.
 * @param svg - The SVG markup string.
 * @param base64 - Whether to encode using base64. Defaults to false.
 */
export function toSvgDataUrl(svg: string, base64 = false): string {
  return base64 ? encodeSvgToBase64(svg) : encodeSvgToUri(svg);
}
