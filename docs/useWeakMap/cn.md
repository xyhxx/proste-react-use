## useWeakMap

> WeakMap Hook

```ts
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
];
```

```tsx
const [, { set, setAll, get, has }] = useWeakMap();
```
