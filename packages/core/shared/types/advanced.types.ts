/**
 * Makes a type deeply partial (all nested properties become optional).
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
  ? T[P] extends (...args: any[]) => any
    ? T[P]
    : DeepPartial<T[P]>
  : T[P];
};

/**
 * Makes a type deeply required (all nested properties become required).
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
  ? T[P] extends (...args: any[]) => any
    ? T[P]
    : DeepRequired<T[P]>
  : T[P];
};

/**
 * Recursively removes null and undefined from a type.
 */
export type NonNullableDeep<T> = {
  [P in keyof T]: NonNullable<T[P]> extends object
  ? NonNullableDeep<NonNullable<T[P]>>
  : NonNullable<T[P]>;
};

/**
 * Extracts all property names from T whose values extend V.
 */
export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/**
 * Extracts all property names from T whose values do NOT extend V.
 */
export type KeysNotMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? never : K;
}[keyof T];

/**
 * A type representing a class constructor.
 */
export type Constructor<T = unknown, Args extends any[] = any[]> = new (...args: Args) => T;

/**
 * A type that accepts a value or a function returning that value.
 */
export type MaybeFactory<T> = T | (() => T);
