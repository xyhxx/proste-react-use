## useSuspense

> 配合 Suspense 组件使用 可以使用任意的 Promise 函数 key 需要是一个唯一值，如果你想复用父组件的信息可以使用和父组件相同
> 的 key

```typescript
useSuspense<R>(key: string | unknown[], fn: () => Promise<R>): R
```

```jsx
const App = function () {
  const data = useSuspense('key', async function () {
    return 2;
  });

  return <p data-testid='data'>{data}</p>;
};

const AppSuspense = function () {
  return (
    <Suspense fallback='loading'>
      <App />
    </Suspense>
  );
};
```
