## useDelay

> 可以主动调用的延迟函数，返回一个函数，函数执行延迟调用传入的函数。

```typescript
function useDelay<T>(fn: (state?: T) => void, delay: number): (state?: T | undefined) => void;
```

```tsx
const Home: FC = function () {
  const delay = useDelay(function () {
    act(function () {
      setState(1);
    });
  }, 2000);

  return <button onClick={delay}>click</button>;
};
```
