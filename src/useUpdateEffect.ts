/*
 * @Description:只有在依赖更新（除了第一次）触发的hook
 * @FilePath: /proste-react-use/src/useUpdateEffect.ts
 */

import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * 只有在依赖更新（除了第一次）触发
 *
 * @example
 *
 * useUpdateEffectFn(() => {
 * ...
 * }, [xxx]);
 */
function useUpdatedEffect(effect: EffectCallback, deps?: DependencyList) {
  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    return effect();
  }, deps);
}

export default useUpdatedEffect;
