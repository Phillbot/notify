/**
 * A type that represents a value that can be null or undefined.
 */
export type Nullable<T> = T | null | undefined;

/**
 * A type that makes all properties of an object optional.
 */
export type PartialRecord<K extends keyof any, V> = {
  [P in K]?: V;
};

/**
 * A type that makes all properties of an object required.
 */
export type RequiredRecord<K extends keyof any, V> = {
  [P in K]-?: V;
};

/**
 * A type that makes all properties of an object readonly.
 */
export type ReadonlyRecord<K extends keyof any, V> = {
  readonly [P in K]: V;
};

/**
 * A type that represents a promise or a value.
 */
export type Promisable<T> = T | Promise<T>;

/**
 * A type that represents a non-empty array.
 */
export type NonEmptyArray<T> = [T, ...T[]];
