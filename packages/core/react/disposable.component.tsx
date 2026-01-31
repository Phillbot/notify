import { Component } from 'react';

import { DisposableStore, IDisposable } from '~core/utils';

/**
 * Base class for React Class Components that manage disposable resources.
 * Automatically disposes of registered resources when the component unmounts.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DisposableComponent<P = any, S = any> extends Component<P, S> {
  protected readonly _disposables = new DisposableStore();

  /**
   * Registers a disposable resource to be automatically cleaned up on unmount.
   * @param disposable The resource to track.
   * @returns The registered resource.
   */
  protected _register<T extends IDisposable>(disposable: T): T {
    return this._disposables.add(disposable);
  }

  override componentWillUnmount(): void {
    this._disposables.dispose();
  }
}
