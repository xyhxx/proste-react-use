## useWindowFocus

> 监听焦点是否在当前页面上

```typescript
function useWindowFocus(): boolean;
```

```tsx
const isFocused = useWindowFocus();

useEffect(
  function () {
    document.title = isFocused ? 'Focused' : 'Not Focused';
  },
  [isFocused],
);
```
