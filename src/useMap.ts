import { useCallback, useReducer, useState } from 'react';

/**
 * Map hooks
 *
 * @example
 *
 * const [, { keys, set, setAll, get, has, size }] = useMap();
 */
function useMap<K, V>(
  initValue?: Iterable<readonly [K, V]>,
): [
  state: Map<K, V>,
  action: {
    readonly get: (key: K) => V | undefined;
    readonly has: (key: K) => boolean;
    readonly set: (key: K, value: V) => void;
    readonly setAll: (val: Iterable<readonly [K, V]>) => void;
    readonly entries: () => IterableIterator<readonly [K, V]>;
    readonly keys: () => IterableIterator<K>;
    readonly values: () => IterableIterator<V>;
    readonly size: () => number;
    readonly clear: () => void;
    readonly reset: () => void;
    readonly remove: (key: K) => boolean;
  },
] {
  const [map, setMap] = useState(() => new Map(initValue));
  const [, forceUpdate] = useReducer((s: number) => s + 1, 0);

  const keys = useCallback(
    function () {
      return map.keys();
    },
    [map],
  );

  const values = useCallback(
    function () {
      return map.values();
    },
    [map],
  );

  const entries = useCallback(
    function () {
      return map.entries();
    },
    [map],
  );

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

  const size = useCallback(
    function () {
      return map.size;
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

  const clear = useCallback(
    function () {
      map.clear();
      forceUpdate();
    },
    [map],
  );

  const reset = useCallback(
    function () {
      setMap(new Map(initValue));
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
      size,
      remove,
      clear,
      reset,
      keys,
      values,
      entries,
    },
  ];
}

export default useMap;
