export function assertNever(value: never, message = "Unexpected value"): never {
  throw new Error(`${message}: ${JSON.stringify(value)}`);
}
