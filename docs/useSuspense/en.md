## useSuspense

> Any promise function can be used with the suspend component. The key must be a unique value. If you want to reuse the
> information of the parent component, you can use the same key as the parent component

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
