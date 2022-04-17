## useWeakSet

> WeakSet hook

```ts
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
];
```

```tsx
const [, { add, addAll, has }] = useWeakSet(['a', 'b', 'c']);
```
