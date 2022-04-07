## useWindowFocus

> Whether the listening focus is on the current page

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
