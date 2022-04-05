## useMounted

> useEffect is triggered only once when loading

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
