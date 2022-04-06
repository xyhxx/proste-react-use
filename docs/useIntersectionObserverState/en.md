## useIntersectionObserverState

> Return the contents of the IntersectionObserver API callback as state

```typescript
function useIntersectionObserverState(options: {
  el: string | MutableRefObject<any>;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}): readonly [
  IntersectionObserverEntry[],
  {
    readonly reObserver: () => void;
    readonly disconnect: () => void;
  },
];
```

```tsx
const [state] = useIntersectionObserverState({ el: '.pDom' });

useEffect(
  function () {
    console.log(state);
  },
  [state],
);
```
