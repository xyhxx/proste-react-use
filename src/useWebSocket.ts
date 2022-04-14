import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

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
    getStatus: () => number;
  },
] {
  const { protocols, onMessage, onError } = options ?? {};
  const [state, setState] = useState<{ data: T | null; error: Event | null }>({
    data: null,
    error: null,
  });

  const socket = useMemo(
    function () {
      return new WebSocket(url, protocols);
    },
    [protocols, url],
  );

  const send = useCallback(
    function (data: string | ArrayBufferLike | Blob | ArrayBufferView) {
      socket.send(data);
    },
    [socket],
  );

  const close = useCallback(
    function (code?: number, reason?: string) {
      socket.close(code, reason);
    },
    [socket],
  );

  const getStatus = useCallback(
    function () {
      return socket.readyState;
    },
    [socket],
  );

  useLayoutEffect(
    function () {
      function message(e: MessageEvent<T>) {
        setState(function (state) {
          return { ...state, data: e.data };
        });
        onMessage?.(e);
      }
      function error(e: Event) {
        onError?.(e);
      }

      socket.addEventListener('message', message);
      socket.addEventListener('error', error);

      return function () {
        socket.removeEventListener('message', message);
        socket.removeEventListener('error', error);
      };
    },
    [onError, onMessage, socket],
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
