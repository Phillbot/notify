/**
 * Makes all properties of T deeply readonly.
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Makes all properties of T deeply mutable.
 */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

/**
 * Utility to get all keys of T that match type U.
 */
export type KeysOfType<T, U> = {
  [K in keyof T]-?: T[K] extends U ? K : never;
}[keyof T];

/**
 * Picks all properties from T that are of type U.
 */
export type PickByValue<T, U> = Pick<T, KeysOfType<T, U>>;

/**
 * Makes only the specified keys in T required.
 */
export type RequiredByKeys<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

/**
 * Makes only the specified keys in T optional.
 */
export type OptionalByKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

/**
 * Makes only the specified keys in T readonly.
 */
export type ReadonlyByKeys<T, K extends keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P];
};

/**
 * Utility type to convert a union to intersection.
 */
export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends
  (k: infer I) => void ? I : never;

/**
 * Flattens a type by merging nested objects into a single level.
 */
export type Flatten<T> = {
  [K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K];
};

/**
 * Recursively makes all fields in T nullable.
 */
export type DeepNullable<T> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> | null : T[K] | null;
};

/**
 * Recursively makes all fields in T undefined-able.
 */
export type DeepUndefined<T> = {
  [K in keyof T]: T[K] extends object ? DeepUndefined<T[K]> | undefined : T[K] | undefined;
};

/**
 * Checks if two types are equal.
 */
export type IsEqual<T, U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? true : false;

/**
 * Gets all keys from T where the value is an object.
 */
export type ObjectKeys<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];

/**
 * Recursively omits keys from object T.
 */
export type DeepOmit<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P] extends object ? DeepOmit<T[P], K> : T[P];
};
