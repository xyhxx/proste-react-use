## useIntersectionObserver

> 做回调触发的 IntersectionObserver，如果你想断开监听请使用 disconnect，想恢复监听请使用 reconnect 如果 dom 变动后监听内
> 容没有重新绑定监听，可以调用 reconnect 重新监听

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
