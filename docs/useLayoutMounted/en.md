## useLayoutMounted

> useLayout is triggered only once

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
