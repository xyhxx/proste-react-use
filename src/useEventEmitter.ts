/*
 * @Description: 发布订阅hook
 * @FilePath: /proste-react-use/src/useEventEmitter.ts
 */

import EventEmitter from 'events';
import { useCallback, useEffect, useRef } from 'react';

const event = new EventEmitter();

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

  useEffect(function () {
    if (!listener) return;

    if (once) {
      if (onceTragger.current) return;
      event.once(key, function (e) {
        onceTragger.current = true;
        listener(e);
      });
    } else {
      event.on(key, listener);
    }

    return function () {
      event.off(key, listener);
    };
  });

  return useCallback(
    (args?: T) => {
      event.emit(key, args);
    },
    [key],
  );
}

export default useEventEmitter;
