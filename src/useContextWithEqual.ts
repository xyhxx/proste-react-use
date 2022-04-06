/*
 * @Description:比较相同context hook 判断返回数据是否有变化进行渲染
 * @FilePath: /proste-react-use/src/useContextWithEqual.ts
 */

import { useMemo } from 'react';
import useLatest from './useLatest';
import { Context, useContextSelector } from 'use-context-selector';
import { isEqual } from './utils';

/**
 * 比较相同contexthook 判断返回数据是否有变化进行渲染
 *
 * @example
 *
 * const {...} = useEqualContext(context, (v) => v.state);
 */

function useContextWithEqual<T, R>(
  context: Context<T>,
  selector: (state: T) => R,
  equal?: (a: any, b: any) => boolean,
) {
  const f = useLatest(selector);
  const memoEqual = useLatest(equal);

  const callback = useMemo(
    function () {
      let memoState: R | null = null;

      return function (state: T) {
        const newState = f.current(state);

        const equalFn = memoEqual.current || isEqual;

        if (!memoState || !equalFn(memoState, newState)) return (memoState = newState);

        return memoState;
      };
    },
    [f],
  );

  return useContextSelector(context, callback);
}

export default useContextWithEqual;
