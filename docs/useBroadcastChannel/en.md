## BroadcastChannel

> BroadcastChannel Web API

```ts
type UseBroadcastChannelOptions<T> = {
  onMessage?: (e: MessageEvent<T>) => void;
  onError?: (e: MessageEvent<any>) => void;
};
function useBroadcastChannel<T>(
  name: string,
  options?: UseBroadcastChannelOptions<T>,
): [
  state: {
    data: T | null;
    error: MessageEvent<any> | null;
  },
  action: {
    postMessage: <P>(data: P) => void;
    close: () => void;
  },
];
```

```tsx
const onError = useCallback(function (e: MessageEvent<any>) {
  console.log(e);
}, []);

const [{ data }, { postMessage }] = useBroadcastChannel('channelName', { onError });

function post() {
  postMessage<number>(1234);
}
```
