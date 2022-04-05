## useDelay

> The delay function that can be actively called returns a function, and the function executes the delay call to the
> incoming function.

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
