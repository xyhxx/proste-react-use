import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import useLatest from './useLatest';
import useRequestAnimationFrame from './useRequestAnimationFrame';
import { EasingFunctionOrList, isArray, isNumber, LINEAR, isEqual } from './utils';
import easing from 'bezier-easing';

export type UseTransitionOptions = {
  duration?: number;
  delay?: number;
  transition?: EasingFunctionOrList;
  onComplete?: () => void;
};

type VoidFunction = () => void;

/**
 * 数字过渡动画
 *
 * @example
 *
 * const [state, setState] = useState(0);
 *
 * const result = useTransition(state);
 *
 * setState(val => val === 0 ? 10 : 0);
 */

export function useTransition(value: number, options?: UseTransitionOptions): number;
export function useTransition(value: number[], options?: UseTransitionOptions): number[];
export function useTransition(
  value: number | number[],
  options?: UseTransitionOptions,
): number | number[] {
  const resultIsNumber = isNumber(value);
  let target = useMemo(
    function () {
      return isArray(value) ? value : [value];
    },
    [value],
  );
  let duration: number;
  let delay: number;
  let transition: EasingFunctionOrList;
  let onComplete: VoidFunction | undefined = void 0;

  if (options) {
    ({ duration = 1000, delay = 0, transition = LINEAR, onComplete } = options);
  } else {
    duration = 1000;
    delay = 0;
    transition = LINEAR;
  }

  const [state, setState] = useState({
    start: target,
    current: target,
    fixed: target,
    endTime: 0,
    diff: [] as number[] | number,
  });
  const timer = useRef<NodeJS.Timeout>();
  const completeFn = useLatest(onComplete);

  const { pause, resume } = useRequestAnimationFrame(function (timestamp) {
    const time = Math.floor(timestamp);
    const { endTime, diff, fixed } = state;
    let proportion = (duration + time - endTime) / duration;
    proportion = proportion > 1 ? 1 : proportion;

    const easingFn = isArray(transition) ? easing(...transition) : transition;

    setState(function (state) {
      return {
        ...state,
        current: fixed.map(function (val, idx) {
          return val + (diff as number[])[idx] * easingFn(proportion);
        }),
      };
    });

    if (proportion >= 1) {
      pause();
      completeFn.current?.();
    }
  });

  useLayoutEffect(
    function () {
      const { start, current } = state;
      if (isEqual(start, target)) return;

      timer.current && clearTimeout(timer.current);
      pause();

      const diff = target.map(function (val, idx) {
        return val - (current[idx] ?? 0);
      });
      setState(function (state) {
        return {
          start: target,
          diff,
          endTime: Math.floor(performance.now() + duration + delay),
          current: state.current,
          fixed: state.current,
        };
      });

      timer.current = setTimeout(function () {
        resume();
      }, delay);
    },
    [delay, duration, pause, resume, state, target],
  );

  return resultIsNumber ? state.current[0] : state.current;
}

export default useTransition;
