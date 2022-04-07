## useUpdatedLayoutEffect

> Triggered only in dependent updates (except for the first time)

```typescript
function useUpdatedLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
```

```tsx
const Home: FC = function () {
  const [state, setState] = useState(0);

  useUpdatedLayoutEffect(
    function () {
      something();
    },
    [state],
  );

  return <></>;
};
```
