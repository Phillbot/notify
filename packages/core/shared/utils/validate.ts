/**
 * Validates if a string is a valid email address.
 * @param email - The email string to validate.
 * @returns True if the email is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * Validates if a string is a valid URL.
 * @param url - The URL string to validate.
 * @returns True if the URL is valid, false otherwise.
 */
export function isValidUrl(url: string): boolean {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9&%_=+#\-.]*)?$/;
  return regex.test(url);
}

/**
 * Validates if a string is a valid phone number.
 * @param phone - The phone number string to validate.
 * @returns True if the phone number is valid, false otherwise.
 */
export function isValidPhoneNumber(phone: string): boolean {
  const regex = /^[+\d]?(?:[\d-() ]{10,})$/;
  return regex.test(phone);
}

/**
 * Checks if the provided value is a non-empty string.
 * @param value - The value to check.
 * @returns True if the value is a non-empty string, false otherwise.
 */
export function isNonEmptyString(value: string): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Checks if the provided value is a number greater than or equal to zero.
 * @param value - The value to check.
 * @returns True if the value is a number greater than or equal to zero, false otherwise.
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value >= 0;
}

/**
 * Validates if the provided value is a valid date string.
 * @param value - The value to check.
 * @returns True if the value is a valid date string, false otherwise.
 */
export function isValidDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Checks if the provided object has all required properties.
 * @param obj - The object to check.
 * @param requiredProps - An array of required property names.
 * @returns True if the object contains all the required properties, false otherwise.
 */
export function hasRequiredProperties<T extends object>(obj: T, requiredProps: string[]): boolean {
  return requiredProps.every(prop => prop in obj);
}
