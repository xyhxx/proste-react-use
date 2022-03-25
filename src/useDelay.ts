/*
 * @Description: 可以主动调用的延迟函数
 * @FilePath: /proste-react-use/src/useDelay.ts
 */

import { useCallback, useEffect, useRef } from 'react';
import useLatest from './useLatest';

/**
 * 可以主动调用的延迟函数
 *
 * @example
 *
 * const delayClose = useDelayFn(function(){
 *  pop();
 * }, 1000);
 *
 * dosomething...
 * delayClose();
 * dosomething...
 */
function useDelay<T>(fn: (state?: T) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const f = useLatest(fn);

  useEffect(function () {
    return function () {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    function (state?: T) {
      if (delay <= 0) return;
      timeoutRef.current = setTimeout(() => f.current(state), delay);
    },
    [delay, f],
  );
}

export default useDelay;
