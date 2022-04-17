import { useCallback, useReducer, useState } from 'react';

/**
 * WeakSet hook
 *
 * @example
 *
 * const [, {add, addAll, has}] = useWeakSet(['a', 'b', 'c']);
 */
function useWeakSet<T extends object>(
  initValue?: Iterable<T>,
): [
  state: WeakSet<T>,
  action: {
    readonly add: (value: T) => void;
    readonly clear: () => void;
    readonly has: (value: T) => boolean;
    readonly remove: (value: T) => boolean;
    readonly reset: () => void;
    readonly addAll: (val: Iterable<T>) => void;
  },
] {
  const [instance, setInstance] = useState(function () {
    return initValue ? new WeakSet(initValue) : new WeakSet();
  });
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
  const has = useCallback((val: T) => instance.has(val), [instance]);
  const reset = useCallback(
    function () {
      setInstance(function () {
        return initValue ? new WeakSet(initValue) : new WeakSet();
      });
    },
    [initValue],
  );
  const clear = useCallback(function () {
    setInstance(new WeakSet());
  }, []);

  return [instance, { add, remove, has, reset, addAll, clear }];
}

export default useWeakSet;
