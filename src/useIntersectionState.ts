/*
 * @Description: IntersectionObserver的值作为state返回
 * @FilePath: /proste-react-use/src/useIntersectionState.ts
 */

import { MutableRefObject, useCallback, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

/**
 * IntersectionObserver的值作为state返回
 *
 * @example
 *
  const [state] = useIntersectionObserverState({ el: '.pDom' });

  useEffect(
    function () {
      console.log(state);
    },
    [state],
  );
*/
function useIntersectionObserverState(options: {
  el: string | MutableRefObject<any>;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}): [
  state: IntersectionObserverEntry[],
  action: { readonly reObserver: () => void; readonly disconnect: () => void },
] {
  const { el, threshold, root, rootMargin } = options;
  const [state, setState] = useState<IntersectionObserverEntry[]>([]);

  const onChange = useCallback(function (e: IntersectionObserverEntry[]) {
    setState(e);
  }, []);

  const { reObserver, disconnect } = useIntersectionObserver({
    el,
    onChange,
    threshold,
    root,
    rootMargin,
  });

  return [state, { reObserver, disconnect }];
}

export default useIntersectionObserverState;
