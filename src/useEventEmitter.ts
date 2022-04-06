/*
 * @Description: 发布订阅hook
 * @FilePath: /proste-react-use/src/useEventEmitter.ts
 */

import { useCallback, useEffect, useRef } from 'react';
import { EventBus } from './utils';

const event = new EventBus();

/**
 * 发布订阅钩子
 *
 * @example
 *
 * 只使用触发
 * const toggle = useEventEmitter('key');
 *
 * 只进行监听
 * useEventEmitter('key', fn);
 *
 * 只监听一次
 * useEventEmitter('key', fn, true);
 */
function useEventEmitter<T>(key: string, listener?: (event: T) => void, once?: boolean) {
  const onceTragger = useRef(false);

  useEffect(
    function () {
      if (!listener) return;

      let listen: (() => void) | null = null;

      if (once) {
        if (onceTragger.current) return;
        listen = event.once<T>(key, function (e) {
          onceTragger.current = true;
          listener(e);
        });
      } else {
        listen = event.on(key, listener);
      }

      return function () {
        listen?.();
      };
    },
    [key, listener, once],
  );

  return useCallback(
    (args?: T) => {
      event.emit(key, args);
    },
    [key],
  );
}

export default useEventEmitter;
