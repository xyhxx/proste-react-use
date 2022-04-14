## useWebSocket

> web socket hook

```ts
type UseWebSocketOptions<T> = {
  protocols?: string | string[];
  onMessage?: (e: MessageEvent<T>) => void;
  onError?: (e: Event) => void;
};

function useWebSocket<T>(
  url: string,
  options?: UseWebSocketOptions<T>,
): [
  state: {
    data: T | null;
    error: Event | null;
  },
  action: {
    send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
    close: (code?: number | undefined, reason?: string | undefined) => void;
    getStatus: () => number;
  },
];
```

```tsx
const [{ data, error }, { send, close, getStatus }] = useWebSocket<string>('wss://socket.idcd.com:1443');
```
