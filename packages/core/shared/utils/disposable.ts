/**
 * Interface representing a disposable resource.
 */
export interface IDisposable {
  /**
   * Disposes the resource.
   */
  dispose(): void;
}

/**
 * Checks if an object is disposable.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isDisposable(object: any): object is IDisposable {
  return object && typeof object.dispose === "function";
}

/**
 * Base class for disposable resources.
 * Implements IDisposable and allows managing multiple disposables.
 */
export class Disposable implements IDisposable {
  private _isDisposed = false;
  protected _disposables: IDisposable[] = [];

  /**
   * Checks if the resource has been disposed.
   */
  public get isDisposed(): boolean {
    return this._isDisposed;
  }

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

/**
 * A container that holds a collection of disposables and disposes them all at once.
 */
export class DisposableStore implements IDisposable {
  private _toDispose = new Set<IDisposable>();
  private _isDisposed = false;

  public add<T extends IDisposable>(t: T): T {
    if (!t) {
      return t;
    }

    if (this._isDisposed) {
      t.dispose();
    } else {
      this._toDispose.add(t);
    }

    return t;
  }

  public dispose(): void {
    if (this._isDisposed) {
      return;
    }

    this._isDisposed = true;
    this._toDispose.forEach((item) => item.dispose());
    this._toDispose.clear();
  }
}
