## useMap

> Map Hook

```ts
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
];
```

```tsx
const [, { keys, set, setAll, get, has, size }] = useMap();
```
