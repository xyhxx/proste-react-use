## useIntersectionObserver

> 做回调触发的 IntersectionObserver，如果你想断开监听请使用 disconnect，想恢复监听请使用 reObserver

```typescript
function useIntersectionObserver(options: {
  el: string | MutableRefObject<any>;
  onChange: (entry: IntersectionObserverEntry[]) => void;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}): {
  readonly reObserver: () => void;
  readonly disconnect: () => void;
};
```

```tsx
const callback = useCallback(function (entry) {
  console.log(entry);
}, []);

const { reObserver, disconnect } = useIntersectionObserver({
  el: '.pdom',
  onChange: callback,
});
```
