/*
 * @Description: IntersectionObserver hooks
 * @FilePath: /proste-react-use/src/useIntersectionObserver.ts
 */

import { MutableRefObject, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { isEqual, isString } from './utils';

/**
 * IntersectionObserver API
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
 *
 * @example
 *
 * const callback = useCallback(function (entry) {
    console.log(entry);
    }, []);

    const { reObserver, disconnect } = useIntersectionObserver({
      el: '.pdom',
      onChange: callback,
    });
 *
 */
function useIntersectionObserver(options: {
  el: string | MutableRefObject<any>;
  onChange: (entry: IntersectionObserverEntry[]) => void;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}) {
  const { el, onChange, threshold, root, rootMargin } = options;
  const observer = useRef<IntersectionObserver | null>(null);
  const [ident, setIdent] = useState(0);
  const isDispose = useRef(false);
  const thresholdMemo = useRef(threshold);

  const thresholds = useMemo(
    function () {
      const memo = thresholdMemo.current;

      if (isEqual(memo, threshold)) {
        return memo;
      }

      return (thresholdMemo.current = threshold);
    },
    [threshold],
  );

  const reObserver = useCallback(function () {
    setIdent(v => v + 1);
    isDispose.current = false;
  }, []);

  const disconnect = useCallback(function () {
    isDispose.current = true;
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
  }, []);

  useLayoutEffect(
    function () {
      if (isDispose.current) return;

      function initObserver() {
        observer.current = new IntersectionObserver(onChange, {
          threshold: thresholds,
          root: root?.current,
          rootMargin,
        });

        let els: Element[] = [];

        if (isString(el)) {
          els = Array.from(document.querySelectorAll(el));
        } else {
          els = [el.current];
        }

        for (let i = 0; i < els.length; i++) {
          observer.current.observe(els[i]);
        }
      }

      initObserver();

      return function () {
        observer.current?.disconnect();
        observer.current = null;
      };
    },
    [el, onChange, root, rootMargin, thresholds, ident],
  );

  return { reObserver, disconnect } as const;
}

export default useIntersectionObserver;
