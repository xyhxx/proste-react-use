## useMounted

> 只有在加载时触发一次的 useEffect

```typescript
function useMounted(effect: EffectCallback): void;
```

```tsx
const Home = function () {
  useMounted(function () {
    something();
  });

  return <></>;
};
```
