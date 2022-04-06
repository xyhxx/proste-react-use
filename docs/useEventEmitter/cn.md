## useEventEmitter

> 发布订阅钩子，实例只在全局初始化一次

只使用触发 const fire = useEventEmitter('key');

只进行监听 useEventEmitter('key', fn);

只监听一次 useEventEmitter('key', fn, true);

```typescript
function useEventEmitter<T>(key: string, listener?: (event: T) => void, once?: boolean): (args?: T | undefined) => void;
```

```tsx
const Son1: FC = function () {
  const [state, setState] = useState(0);

  const listener = useCallback(function (e) {
    setState(v => v + (e ?? 1));
  }, []);

  useEventEmitter<number | undefined>(KEY, listener);

  return (
    <>
      <p data-testid='son1_state'>{state}</p>
    </>
  );
};
const Son2: FC = function () {
  const [state, setState] = useState(0);

  const listener = useCallback(function (e) {
    setState(v => v + (e ?? 1));
  }, []);

  useEventEmitter<number | undefined>(KEY, listener, true);

  return (
    <>
      <p data-testid='son2_state'>{state}</p>
    </>
  );
};
const Son3: FC = function () {
  const fire = useEventEmitter(KEY);
  const fireNumber = useEventEmitter<number>(KEY);

  return (
    <>
      <button data-testid='btn' onClick={() => fire()}></button>
      <button data-testid='btn_number' onClick={() => fireNumber(2)}></button>
    </>
  );
};
const Home: FC = () => (
  <>
    <Son1 />
    <Son2 />
    <Son3 />
  </>
);
```
