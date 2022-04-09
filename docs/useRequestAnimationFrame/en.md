## useRequestAnimationFrame

> requestAnimationFrame hook

```typescript
function useRequestAnimationFrame(
  fn: (timestamp: number) => void,
  auto?: boolean,
): {
  readonly pause: () => void;
  readonly resume: () => void;
  readonly isActive: () => boolean;
};
```

```tsx
let start;

const { pause } = useRequestAnimationFrame(function (timestamp) {
  if (start === void 0) start = timestamp;
  const elapsed = timestamp - start;

  console.log(elapsed);

  if (elapsed >= 2000) {
    pause();
  }
}, true);
```
