## useUpdateEffect

> 只有在依赖更新（除了第一次）触发

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
