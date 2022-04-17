## useSet

> Set Hook

```ts
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
];
```

```tsx
const [, { add, addAll, has }] = useSet(['a', 'b', 'c']);
```
