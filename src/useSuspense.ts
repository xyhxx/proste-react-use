/*
 * @Description: 可以通过suspense的方式渲染
 * @FilePath: /proste-react-use/src/useSuspense.ts
 */
import { isFunction, isString, isEqual } from 'lodash';
import { useEffect, useRef } from 'react';

type SuspenseCache = {
  status: 'pending' | 'fulfil' | 'reject';
  reason?: unknown;
  result?: unknown;
  promise: Promise<unknown>;
};

const cacheMap = new Map<string | unknown[], SuspenseCache>();

function findMap(
  key: string | unknown[],
): [key: string | unknown[], value: SuspenseCache | undefined] {
  if (isString(key)) return [key, cacheMap.get(key)];

  const keys = Array.from(cacheMap.keys());

  for (const mapkey of keys) {
    if (isEqual(key, mapkey)) {
      return [mapkey, cacheMap.get(mapkey)];
    }
  }

  return [key, void 0];
}

/**
 * 可以通过suspense的方式渲染
 *
 * @exmaple
 *
 * useSuspense('key', async function(){
 *  return new SomeClass();
 * })
 */
function useSuspense<R>(key: string | unknown[], fn: () => Promise<R>): R {
  const timer = useRef<NodeJS.Timeout>();

  useEffect(
    function () {
      timer?.current && clearTimeout(timer.current);

      return function () {
        const [cacheKey] = findMap(key);
        timer.current = setTimeout(function () {
          cacheMap.delete(cacheKey);
        }, 1);
      };
    },
    [key],
  );

  if (!key) {
    throw new Error('key must be passed in');
  }
  if (!isString(key) && !Array.isArray(key)) {
    throw new Error('key must be string or array');
  }

  if (!isFunction(fn)) {
    throw new Error('fn must be a function');
  }

  const [, cacheValue] = findMap(key);

  if (cacheValue) {
    switch (cacheValue.status) {
      case 'pending':
        throw cacheValue.promise;
      case 'fulfil':
        return cacheValue.result as R;
      case 'reject':
        throw cacheValue.reason;
    }
  }

  const promise: SuspenseCache = {
    status: 'pending',
    promise: fn()
      .then(function (res) {
        promise.status = 'fulfil';
        promise.result = res;
      })
      .catch(function (err) {
        promise.status = 'reject';
        promise.reason = err;
      }),
  };

  cacheMap.set(key, promise);

  throw promise.promise;
}

export default useSuspense;
