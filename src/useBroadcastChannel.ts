import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

export type UseBroadcastChannelOptions<T> = {
  onMessage?: (e: MessageEvent<T>) => void;
  onError?: (e: MessageEvent<any>) => void;
};

/**
 * BroadcastChannel 通讯API
 *
 * @export
 *
 * const onError = useCallback(function (e: MessageEvent<any>) {
 *  console.log(e);
 * }, [])
 *
 * const [{data}, {postMessage}] = useBroadcastChannel('channelName', {onError});
 *
 * function post(){
 *  postMessage<number>(1234);
 * }
 */

function useBroadcastChannel<T>(
  name: string,
  options?: UseBroadcastChannelOptions<T>,
): [
  state: { data: T | null; error: MessageEvent<any> | null },
  action: { postMessage: <P>(data: P) => void; close: () => void },
] {
  const channel = useMemo(() => new BroadcastChannel(name), [name]);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<MessageEvent<any> | null>(null);
  const { onMessage, onError } = options ?? {};

  const postMessage = useCallback(
    function <P>(data: P) {
      channel.postMessage(data);
    },
    [channel],
  );

  const close = useCallback(
    function () {
      channel.close();
    },
    [channel],
  );

  useLayoutEffect(
    function () {
      const bc = channel;

      function message(e: MessageEvent<T>) {
        setData(e.data);
        onMessage?.(e);
      }

      function error(e: MessageEvent<any>) {
        setError(e);
        onError?.(e);
      }

      bc.addEventListener('message', message);
      bc.addEventListener('messageerror', error);

      return function () {
        bc.removeEventListener('message', message);
        bc.removeEventListener('messageerror', error);
      };
    },
    [channel, onError, onMessage],
  );

  return [
    { data, error },
    { postMessage, close },
  ];
}

export default useBroadcastChannel;
