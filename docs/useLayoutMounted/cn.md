## useLayoutMounted

> 只触发一次 useLayout

```typescript
function useLayoutMounted(effect: EffectCallback): void;
```

```jsx
const Home = function () {
  useLayoutMounted(function () {
    something();
  });

  return <></>;
};
```
