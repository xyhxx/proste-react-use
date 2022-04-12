## useIntersectionObserver

> Intersectionobserver API hook.If you want to disconnect listening, use disconnect. If you want to resume listening,
> use reconnect. If the listening content is not rebinding after DOM changes, you can call reconnect to listen again

```typescript
function useIntersectionObserver(options: {
  el: string | MutableRefObject<any>;
  onChange: (entry: IntersectionObserverEntry[]) => void;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}): {
  readonly reconnect: () => void;
  readonly disconnect: () => void;
};
```

```tsx
const callback = useCallback(function (entry) {
  console.log(entry);
}, []);

const { reconnect, disconnect } = useIntersectionObserver({
  el: '.pdom',
  onChange: callback,
});
```
