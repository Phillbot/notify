/**
 * Waits for a given number of milliseconds.
 *
 * @param ms - Milliseconds to wait
 * @returns A promise that resolves after the given delay
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wraps a promise with a timeout. Rejects if timeout is exceeded.
 *
 * @param promise - The promise to wrap
 * @param ms - Timeout in milliseconds
 * @param message - Optional timeout message
 * @returns A promise that resolves or rejects accordingly
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Timeout exceeded'
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(message)), ms)
  );
  return Promise.race([promise, timeout]);
}

/**
 * Retries an asynchronous function a given number of times with optional delay.
 *
 * @param fn - The async function to retry
 * @param retries - Number of attempts
 * @param delay - Delay between retries (ms)
 * @returns The result of the function or throws after final failure
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) await wait(delay);
    }
  }
  throw lastError;
}

/**
 * Returns a promise that resolves when the given condition returns true.
 *
 * @param condition - Function that returns a boolean
 * @param interval - Polling interval in milliseconds
 * @param timeout - Optional timeout in milliseconds
 * @returns A promise that resolves when the condition is true
 */
export async function waitFor(
  condition: () => boolean,
  interval = 100,
  timeout = 5000
): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      if (condition()) return resolve();
      if (Date.now() - start >= timeout) return reject(new Error('Timeout exceeded'));
      setTimeout(check, interval);
    };
    check();
  });
}

/**
 * Runs multiple promises and returns a map of their statuses and results.
 *
 * @param entries - A record of promises
 * @returns A record with either 'fulfilled' or 'rejected' results
 */
export async function allSettledMap<T extends Record<string, Promise<any>>>(
  entries: T
): Promise<{
  [K in keyof T]: { status: 'fulfilled'; value: Awaited<T[K]> } | { status: 'rejected'; reason: unknown };
}> {
  const keys = Object.keys(entries) as (keyof T)[];
  const results = await Promise.allSettled(Object.values(entries));

  return keys.reduce((acc, key, index) => {
    acc[key] = results[index] as any;
    return acc;
  }, {} as any);
}

/**
 * Waits for a condition to become true, then delays continuation.
 *
 * @param condition - The condition to wait for
 * @param delayMs - Additional delay in ms once condition is met
 */
export async function delayUntil(condition: () => boolean, delayMs = 0): Promise<void> {
  await waitFor(condition);
  if (delayMs > 0) {
    await wait(delayMs);
  }
}

/**
 * Converts a promise into a tuple of [error, result], avoiding try/catch.
 *
 * @param promise - The promise to wrap
 * @returns A tuple where the first element is error (if any) and the second is result
 */
export async function to<T>(promise: Promise<T>): Promise<[null, T] | [any, null]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err, null];
  }
}

/**
 * Memoizes an async function by a string key.
 *
 * @param fn - The async function to memoize
 * @returns A new function that caches results
 */
export function memoizeAsync<T, R>(fn: (key: T) => Promise<R>): (key: T) => Promise<R> {
  const cache = new Map<T, Promise<R>>();

  return (key: T) => {
    if (!cache.has(key)) {
      cache.set(key, fn(key));
    }
    return cache.get(key)!;
  };
}
