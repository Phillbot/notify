/**
 * Returns the current NODE_ENV value.
 */
export function getEnv(): string {
  return process.env.NODE_ENV || 'development';
}

/**
 * Checks if the current environment is development.
 */
export function isDev(): boolean {
  return getEnv() === 'development';
}

/**
 * Checks if the current environment is production.
 */
export function isProd(): boolean {
  return getEnv() === 'production';
}

/**
 * Checks if the current environment is test.
 */
export function isTest(): boolean {
  return getEnv() === 'test';
}

/**
 * Returns a specific environment variable or fallback if not set.
 * @param key - The name of the environment variable.
 * @param fallback - A fallback value to return if the variable is not set.
 */
export function getEnvVar(key: string, fallback?: string): string | undefined {
  return process.env[key] ?? fallback;
}

/**
 * Ensures a specific environment variable exists, otherwise throws an error.
 * @param key - The name of the environment variable.
 */
export function assertEnvVar(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
