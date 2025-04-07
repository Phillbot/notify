/**
 * Represents a generic function type.
 * @template Args - The tuple of arguments.
 * @template Return - The return type of the function.
 */
export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return;

/**
 * Represents a function that returns void.
 */
export type VoidFn<Args extends any[] = any[]> = (...args: Args) => void;

/**
 * Represents a function that returns a promise.
 */
export type AsyncFn<Args extends any[] = any[], Return = any> = (...args: Args) => Promise<Return>;

/**
 * Represents a function with no arguments.
 */
export type Noop = () => void;

/**
 * Represents a function that accepts a value and returns a boolean (predicate).
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Represents a function that transforms a value of type T to type U.
 */
export type Transformer<T, U> = (input: T) => U;
