import { BehaviorSubject } from 'rxjs';
import { deepFreeze } from './deep-freeze';

/**
 * Simple state manager to manage a JSON-like state.
 *
 * The class can be used as a super class, or as a standalone class.
 * ```typescript
 * // Super class
 * export class MyService extends SimpleState<any> {}
 * // Standalone
 * uiState = new SimpleState<any>();
 * ```
 */
export class SimpleState<T> {
  /** @private */
  #state = new BehaviorSubject<Partial<T>>({});

  /**
   * RxJS Observable representing the state
   * @public
   */
  state$ = this.#state.asObservable();

  /**
   * JS Object representing the state at the time of the call
   * @public
   */
  get state() {
    return this.#state.value;
  }

  /**
   *
   * @param initialState Initial state to begin with. Defaults to an empty object.
   */
  constructor(initialState: Partial<T> = {}) {
    this.updateState(initialState);
  }

  /**
   * Applies a new state value to the existing state.
   * @param state New state to apply
   */
  updateState(state: Partial<T>) {
    const newState = {
      ...this.state,
      ...state,
    };

    this.#state.next(deepFreeze(newState));
  }
}
