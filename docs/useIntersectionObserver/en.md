## useIntersectionObserver

> Intersectionobserver API hook.If you want to disconnect listening, use disconnect. If you want to resume listening,
> use reobserver

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
