## useAsyncLock

> Asynchronous function lock. When the asynchronous function is executed, it will not be executed again, and an undefind
> will be returned.

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
