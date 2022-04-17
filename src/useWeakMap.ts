import { useCallback, useReducer, useState } from 'react';

/**
 * WeakMap hooks
 *
 * @example
 *
 * const [, { set, setAll, get, has }] = useWeakMap();
 */
function useWeakMap<K extends object, V>(
  initValue?: Iterable<readonly [K, V]>,
): [
  state: WeakMap<K, V>,
  action: {
    readonly get: (key: K) => V | undefined;
    readonly has: (key: K) => boolean;
    readonly set: (key: K, value: V) => void;
    readonly setAll: (val: Iterable<readonly [K, V]>) => void;
    readonly reset: () => void;
    readonly remove: (key: K) => boolean;
    readonly clear: () => void;
  },
] {
  const [map, setMap] = useState(function () {
    return initValue ? new WeakMap(initValue) : new WeakMap();
  });
  const [, forceUpdate] = useReducer((s: number) => s + 1, 0);

  const clear = useCallback(function () {
    setMap(new WeakMap());
  }, []);

  const get = useCallback(
    function (key: K) {
      return map.get(key);
    },
    [map],
  );

  const has = useCallback(
    function (key: K) {
      return map.has(key);
    },
    [map],
  );

  const set = useCallback(
    function (key: K, value: V) {
      map.set(key, value);
      forceUpdate();
    },
    [map],
  );

  const setAll = useCallback(
    function (val: Iterable<readonly [K, V]>) {
      for (const [key, value] of val) {
        map.set(key, value);
      }
      forceUpdate();
    },
    [map],
  );

  const remove = useCallback(
    function (key: K) {
      const result = map.delete(key);
      forceUpdate();
      return result;
    },
    [map],
  );

  const reset = useCallback(
    function () {
      setMap(function () {
        return initValue ? new WeakMap(initValue) : new WeakMap();
      });
    },
    [initValue],
  );

  return [
    map,
    {
      get,
      has,
      set,
      setAll,
      remove,
      reset,
      clear,
    },
  ];
}

export default useWeakMap;
