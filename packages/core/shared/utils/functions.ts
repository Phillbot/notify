/**
 * Returns a function that always returns the given value.
 *
 * @param value - The value to return
 * @returns A function that returns the value
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * Returns a function that does nothing.
 */
export function noop(): void {
  return;
}

/**
 * Returns true if the given value is a function.
 *
 * @param value - The value to check
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

/**
 * Returns a function that executes the original function only once.
 *
 * @param fn - The function to execute once
 * @returns A new function that only runs once
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as T;
}

/**
 * Composes functions from right to left.
 *
 * @param funcs - Functions to compose
 * @returns A function representing the composition
 */
export function compose<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => funcs.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Pipes functions from left to right.
 *
 * @param funcs - Functions to pipe
 * @returns A function representing the pipe
 */
export function pipe<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => funcs.reduce((acc, fn) => fn(acc), arg);
}

/**
 * Returns a throttled version of the given function that only invokes
 * at most once per every `delay` milliseconds.
 *
 * @param fn - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  } as T;
}

/**
 * Returns a debounced version of the given function that only invokes
 * after the specified `delay` milliseconds have passed since the last call.
 *
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  } as T;
}

/**
 * Creates a throttled version of the given function using requestAnimationFrame.
 * Ensures the function is only called once per animation frame.
 *
 * @param fn - The function to throttle
 * @returns A throttled function
 */
export function rafThrottle<T extends (...args: any[]) => void>(fn: T): T {
  let scheduled = false;

  return function (this: any, ...args: any[]) {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        fn.apply(this, args);
      });
    }
  } as T;
}

/**
 * Creates a debounced version of the given function using requestAnimationFrame.
 * Ensures the function is only called on the next animation frame after the last invocation.
 *
 * @param fn - The function to debounce
 * @returns A debounced function
 */
export function rafDebounce<T extends (...args: any[]) => void>(fn: T): T {
  let frameId: number | null = null;

  return function (this: any, ...args: any[]) {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
    }
    frameId = requestAnimationFrame(() => {
      fn.apply(this, args);
    });
  } as T;
}
