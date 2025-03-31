export type ReadonlyRecord<K extends keyof any, V> = {
  readonly [P in K]: V;
};

export type ServiceToken<T> = {
  $: symbol;
  useClass: new (...args: any[]) => T;
};

export function createServiceToken<T>(config: {
  id: string;
  useClass: new (...args: any[]) => T;
}): ServiceToken<T> {
  return {
    $: Symbol.for(config.id),
    useClass: config.useClass,
  };
}
