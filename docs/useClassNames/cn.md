## useClassNames

> 将各种类型的数据合并成一个 string 类型返回用于 className

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
