/**
 * Checks if a string is a valid hex color code.
 * This function validates whether the given string is a valid hex code (3 or 6 characters).
 * @param color - The color string to check, should start with '#' followed by 3 or 6 hexadecimal characters.
 * @returns True if the string is a valid hex color code, false otherwise.
 */
export function isHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(color);
}

/**
 * Converts an RGB color to its hexadecimal representation.
 * This function takes RGB components and returns the equivalent hex code.
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @returns The hex color code as a string, e.g., #FF5733.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

/**
 * Converts a hex color to RGB format.
 * This function takes a hex color string and returns the equivalent RGB components.
 * @param hex - The hex color code (e.g., #FF5733).
 * @returns An object with the red, green, and blue components of the color, e.g., { r: 255, g: 87, b: 51 }.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#([0-9A-Fa-f]{3}){1,2}$/.exec(hex);
  if (!result) {
    return null;
  }

  const [r, g, b] = result[1].length === 6
    ? [parseInt(result[1].slice(0, 2), 16), parseInt(result[1].slice(2, 4), 16), parseInt(result[1].slice(4, 6), 16)]
    : [parseInt(result[1].charAt(0) + result[1].charAt(0), 16), parseInt(result[1].charAt(1) + result[1].charAt(1), 16), parseInt(result[1].charAt(2) + result[1].charAt(2), 16)];

  return { r, g, b };
}

/**
 * Lightens or darkens a color by a given percentage.
 * This function modifies the brightness of a given hex color by the specified percentage.
 * @param hex - The hex color code.
 * @param percent - The percentage to lighten (positive) or darken (negative). E.g., 20 to lighten, -20 to darken.
 * @returns The new hex color code as a string.
 */
export function adjustColorBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
  const adjust = (value: number) => Math.min(255, Math.max(0, value + (value * percent) / 100));

  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);

  return rgbToHex(newR, newG, newB);
}

/**
 * Converts a HSL color to its RGB representation.
 * This function converts a color from HSL format to RGB.
 * @param h - The hue value (0-360).
 * @param s - The saturation value (0-100).
 * @param l - The lightness value (0-100).
 * @returns An object with the RGB components, e.g., { r: 255, g: 87, b: 51 }.
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r: number, g: number, b: number;
  if (h < 60) {
    r = c; g = x; b = 0;
  } else if (h < 120) {
    r = x; g = c; b = 0;
  } else if (h < 180) {
    r = 0; g = c; b = x;
  } else if (h < 240) {
    r = 0; g = x; b = c;
  } else if (h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

/**
 * Converts an RGB color to HSL format.
 * This function converts an RGB color to HSL.
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @returns An object with the hue, saturation, and lightness components.
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (max + min);
  const l = h;

  const hue = max === r
    ? (g - b) / (max - min)
    : max === g
      ? 2 + (b - r) / (max - min)
      : 4 + (r - g) / (max - min);

  return {
    h: Math.round((hue * 60 + 360) % 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Determines if a string is a valid CSS color name.
 * This function checks if the provided string corresponds to a valid CSS color name.
 * @param color - The color name (e.g., 'red').
 * @returns True if the string is a valid CSS color name, false otherwise.
 */
export function isCssColorName(color: string): boolean {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return false;

  context.fillStyle = color;
  return context.fillStyle !== '';
}
