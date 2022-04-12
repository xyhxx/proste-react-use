## useAsyncLock

> 异步函数锁，在异步函数执行完成执行不会再执行 会返回一个 undefind。

```typescript
function useAsyncLock<T, R>(
  fn: (params?: T) => Promise<R>,
): [state: MutableRefObject<boolean>, action: (params?: T | undefined) => Promise<R | undefined>];
```

```tsx
const asyncFn = useCallback(function () {
  return new Promise(function (res) {
    setTimeout(function () {
      res('1234');
    }, 2000);
  });
}, []);

const [isLocked, fn] = useAsyncLock(fn);
```
