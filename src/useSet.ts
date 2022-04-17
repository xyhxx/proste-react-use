import { useCallback, useReducer, useState } from 'react';

/**
 * set hook
 *
 * @example
 *
 * const [, {add, addAll, has}] = useSet(['a', 'b', 'c']);
 */
function useSet<T>(initValue?: Iterable<T>): [
  state: Set<T>,
  action: {
    readonly add: (value: T) => void;
    readonly clear: () => void;
    readonly has: (value: T) => boolean;
    readonly size: () => number;
    readonly values: () => IterableIterator<T>;
    readonly remove: (value: T) => boolean;
    readonly reset: () => void;
    readonly addAll: (val: Iterable<T>) => void;
  },
] {
  const [instance, setInstance] = useState(() => new Set(initValue));
  const [, forceUpdate] = useReducer((s: number) => s + 1, 0);

  const add = useCallback(
    function (val: T) {
      instance.add(val);
      forceUpdate();
    },
    [instance],
  );
  const addAll = useCallback(
    function (val: Iterable<T>) {
      for (const el of val) {
        instance.add(el);
      }

      forceUpdate();
    },
    [instance],
  );
  const remove = useCallback(
    function (val: T) {
      const result = instance.delete(val);
      forceUpdate();
      return result;
    },
    [instance],
  );
  const size = useCallback(
    function () {
      return instance.size;
    },
    [instance],
  );
  const clear = useCallback(() => instance.clear(), [instance]);
  const has = useCallback((val: T) => instance.has(val), [instance]);
  const values = useCallback(() => instance.values(), [instance]);
  const reset = useCallback(
    function () {
      setInstance(() => new Set(initValue));
    },
    [initValue],
  );

  return [instance, { add, remove, size, clear, has, values, reset, addAll }];
}

export default useSet;
