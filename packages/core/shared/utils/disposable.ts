import { IDisposable } from "handy-ts-tools";

/**
 * Base class for disposable resources.
 * Implements IDisposable and allows managing multiple disposables.
 */
export class Disposable implements IDisposable {
  private _isDisposed = false;
  protected _disposables: IDisposable[] = [];

  /**
   * Disposes the resource and all registered children.
   */
  public dispose(): void {
    if (this._isDisposed) {
      return;
    }

    this._isDisposed = true;

    // Dispose in reverse order
    while (this._disposables.length > 0) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Registers a disposable to be disposed when this instance is disposed.
   * @param disposable The disposable to register.
   */
  protected _register<T extends IDisposable>(disposable: T): T {
    if (this._isDisposed) {
      disposable.dispose();
    } else {
      this._disposables.push(disposable);
    }
    return disposable;
  }
}
