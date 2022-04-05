## useUpdateEffect

> Triggered only in dependent updates (except for the first time)

```typescript
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
```

```tsx
const Home: FC = function () {
  const [state, setState] = useState(0);

  useUpdateEffect(
    function () {
      something();
    },
    [state],
  );

  return <></>;
};
```
