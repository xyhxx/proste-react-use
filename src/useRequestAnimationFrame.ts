import { useCallback, useLayoutEffect, useRef } from 'react';
import useLatest from './useLatest';

/**
 * requestAnimationFrame hook
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame
 *
 * @example
 *
 * let start;
 *
 * const { pause } = useRequestAnimationFrame(function (timestamp) {
    if (start === void 0) start = timestamp;
    const elapsed = timestamp - start;

    //这里使用`Math.min()`确保元素刚好停在200px的位置。
    console.log(elapsed);

    if (elapsed >= 2000) {
      // 在两秒后停止动画
      pause();
    }
  }, true);
 */
function useRequestAnimationFrame(fn: (timestamp: number) => void, auto?: boolean) {
  const frame = useRef<number>();
  const active = useRef(false);
  const callback = useLatest(fn);

  const loop = useCallback(
    function (timestamp: number) {
      if (!active.current) return;

      callback.current(timestamp);

      frame.current = requestAnimationFrame(loop);
    },
    [callback],
  );

  const pause = useCallback(function () {
    active.current = false;
    frame.current && cancelAnimationFrame(frame.current);
  }, []);

  const resume = useCallback(
    function () {
      active.current = true;
      frame.current = requestAnimationFrame(loop);
    },
    [loop],
  );

  const isActive = useCallback(function () {
    return active.current;
  }, []);

  useLayoutEffect(
    function () {
      if (!auto) return;

      if (auto || active.current) {
        active.current = true;
        frame.current = requestAnimationFrame(loop);
      }

      return function () {
        frame.current && cancelAnimationFrame(frame.current);
      };
    },
    [auto, loop],
  );

  return { pause, resume, isActive } as const;
}

export default useRequestAnimationFrame;
