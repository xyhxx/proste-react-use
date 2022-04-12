## useIntersectionObserverState

> 将 IntersectionObserver 回调内容作为 state 返回

```typescript
function useIntersectionObserverState(options: {
  el: string | MutableRefObject<any>;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}): readonly [
  IntersectionObserverEntry[],
  {
    readonly reconnect: () => void;
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
