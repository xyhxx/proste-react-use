import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type UseWebSocketOptions<T> = {
  protocols?: string | string[];
  onMessage?: (e: MessageEvent<T>) => void;
  onError?: (e: Event) => void;
};

/**
 * web socket hook
 *
 * @example
 *
 * const [{ data, error }, { send, close, getStatus }] = useWebSocket<string>(
    'wss://socket.idcd.com:1443',
  );
 *
 */

function useWebSocket<T>(
  url: string,
  options?: UseWebSocketOptions<T>,
): [
  state: { data: T | null; error: Event | null },
  action: {
    send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
    close: (code?: number | undefined, reason?: string | undefined) => void;
    getStatus: () => number | undefined;
  },
] {
  const { protocols, onMessage, onError } = options ?? {};
  const [state, setState] = useState<{ data: T | null; error: Event | null }>({
    data: null,
    error: null,
  });

  const socket = useRef<WebSocket | null>(null);

  const send = useCallback(
    function (data: string | ArrayBufferLike | Blob | ArrayBufferView) {
      socket.current?.send(data);
    },
    [socket],
  );

  const close = useCallback(
    function (code?: number, reason?: string) {
      socket.current?.close(code, reason);
    },
    [socket],
  );

  const getStatus = useCallback(
    function () {
      return socket.current?.readyState;
    },
    [socket],
  );

  useLayoutEffect(
    function () {
      socket.current = new WebSocket(url, protocols);

      function message(e: MessageEvent<T>) {
        setState(function (state) {
          return { ...state, data: e.data };
        });
        onMessage?.(e);
      }
      function error(e: Event) {
        setState(function (state) {
          return { ...state, error: e };
        });
        onError?.(e);
      }

      socket.current.addEventListener('message', message);
      socket.current.addEventListener('error', error);

      return function () {
        socket.current?.removeEventListener('message', message);
        socket.current?.removeEventListener('error', error);
        socket.current?.close();
        socket.current = null;
      };
    },
    [onError, onMessage, protocols, socket, url],
  );

  return [
    state,
    {
      send,
      close,
      getStatus,
    },
  ];
}

export default useWebSocket;
