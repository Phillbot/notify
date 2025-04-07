/**
 * Represents a token used to register and resolve class-based services in the DI container.
 */
export type ServiceToken<T> = {
  $: symbol;
  useClass: new (...args: any[]) => T;
};

/**
 * Represents a token used to register and resolve value-based services in the DI container.
 */
export type ValueToken = {
  /** Unique symbol identifier for the token. */
  $: symbol;
};

/**
 * Creates a service token used to bind a class in the DI container.
 *
 * @param config - An object containing a unique id and the class to bind.
 * @returns A token containing a symbol and class reference.
 */
export function createServiceToken<T>(config: {
  id: string;
  useClass: new (...args: any[]) => T;
}): ServiceToken<T> {
  return {
    $: Symbol.for(config.id),
    useClass: config.useClass,
  };
}

/**
 * Creates a value token used to bind a constant or value in the DI container.
 *
 * @param id - A unique identifier for the token.
 * @returns A token containing a symbol.
 */
export function createValueToken(id: string): ValueToken {
  return {
    $: Symbol.for(id),
  };
}

/**
 * Extracts the identifier string from a token symbol.
 *
 * @param token - The token from which to extract the ID.
 * @returns The string identifier or 'unknown-token' if not available.
 */
export function getTokenId(token: { $: symbol }): string {
  return token.$.description ?? 'unknown-token';
}

/**
 * Extracts the symbol from a given token. Useful for decorating with @inject.
 *
 * @param token - A service or value token.
 * @returns The unique symbol of the token.
 */
export function injectToken<T>(token: ServiceToken<T> | ValueToken): symbol {
  return token.$;
}
