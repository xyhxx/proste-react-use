## useClassNames

> Merge various types of data into one string type and return it for className

```ts
type ObjectClassNames = Record<string, unknown>;
type ClassNamesArgs = Array<ObjectClassNames | string | ClassNamesArgs>;

function useClassNames(): (...args: ClassNamesArgs) => string;
```

```tsx
const classNames = useClassNames();

classNames('a', 'b', { c: true, d: false }); // 'a b c'
classNames(['a', 'b']); // 'a b'
classNames({ a: () => true, b: () => false }); // 'a'
```
