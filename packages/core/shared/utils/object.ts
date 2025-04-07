/**
 * Checks if the provided value is a plain object (not null and not an array).
 *
 * @param value - The value to check
 * @returns True if the value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Performs a shallow comparison of two plain objects.
 *
 * @param a - First object
 * @param b - Second object
 * @returns True if both objects have the same keys and values
 */
export function isShallowEqualObject<T extends object>(a: T, b: T): boolean {
  if (a === b) return true;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => (a as any)[key] === (b as any)[key]);
}

/**
 * Removes undefined properties from an object.
 *
 * @param obj - The object to clean
 * @returns A new object without undefined properties
 */
export function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}

/**
 * Deeply merges two plain objects. Arrays and other complex types are not merged recursively.
 *
 * @param target - The target object
 * @param source - The source object
 * @returns A new merged object
 */
export function mergeObjects<T extends object, U extends object>(target: T, source: U): T & U {
  const result: any = { ...target };

  for (const key in source) {
    if (
      isPlainObject(source[key]) &&
      isPlainObject(result[key])
    ) {
      result[key] = mergeObjects(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Checks if an object has no own enumerable properties.
 *
 * @param obj - The object to check
 * @returns True if the object is empty
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Omits specified keys from an object.
 *
 * @param obj - The original object
 * @param keys - The keys to omit
 * @returns A new object without the specified keys
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Picks only specified keys from an object.
 *
 * @param obj - The original object
 * @param keys - The keys to pick
 * @returns A new object with only the specified keys
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Deeply clones an object or array.
 *
 * @param obj - The value to deeply clone
 * @returns A new deep clone of the input
 */
export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}

/**
 * Checks whether a nested key exists in an object using dot notation.
 *
 * @param obj - The object to check
 * @param path - Dot-notated path string (e.g., "a.b.c")
 * @returns True if the nested key exists
 */
export function hasNestedKey(obj: object, path: string): boolean {
  return path.split('.').every((key) => {
    if (typeof obj === 'object' && obj !== null && key in obj) {
      obj = (obj as any)[key];
      return true;
    }
    return false;
  });
}

/**
 * Flattens a nested object into a single-level object with dot-notated keys.
 *
 * @param obj - The object to flatten
 * @param prefix - Internal prefix for recursion
 * @returns A new flattened object
 */
export function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, prefixedKey));
    } else {
      acc[prefixedKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Recursively freezes an object, making it immutable.
 *
 * @param obj - The object to freeze
 * @returns The frozen object
 */
export function deepFreeze<T>(obj: T): T {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}
