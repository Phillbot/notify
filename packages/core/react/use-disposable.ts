import { useEffect, useState } from "react";

import { DisposableStore, IDisposable } from "~core/utils";

/**
 * Hook to manage a Disposable resource.
 * The factory function is called once to create the instance.
 * The instance is disposed when the component unmounts.
 */
export function useDisposable<T extends IDisposable>(factory: () => T): T {
  const [instance] = useState(factory);

  useEffect(() => {
    return () => {
      instance.dispose();
    };
  }, [instance]);

  return instance;
}

/**
 * Hook that provides a DisposableStore.
 * Useful for registering multiple disposables (event listeners, subscriptions)
 * that should be cleaned up when the component unmounts.
 */
export function useDisposableStore(): DisposableStore {
  const [store] = useState(() => new DisposableStore());

  useEffect(() => {
    return () => {
      store.dispose();
    };
  }, [store]);

  return store;
}
