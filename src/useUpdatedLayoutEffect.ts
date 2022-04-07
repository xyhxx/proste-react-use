import { DependencyList, EffectCallback, useLayoutEffect, useRef } from 'react';

/**
 * 只有在依赖更新（除了第一次）触发
 *
 * @example
 *
 * useUpdatedLayoutEffect(() => {
 * ...
 * }, [xxx]);
 */
function useUpdatedLayoutEffect(effect: EffectCallback, deps?: DependencyList) {
  const isMount = useRef(false);

  useLayoutEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    return effect();
  }, deps);
}

export default useUpdatedLayoutEffect;
