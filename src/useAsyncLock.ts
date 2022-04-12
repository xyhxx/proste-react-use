import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * 异步函数锁
 * 在异步函数执行完成执行不会再执行 会返回一个undefind
 *
 * @example
 *
 * const asyncFn = useCallback(async function(){
 *  return '1234';
 * }, []);
 *
 * const [isLocked,fn] = useAsyncLock(fn);
 */
function useAsyncLock<T, R>(
  fn: (params?: T) => Promise<R>,
): [state: MutableRefObject<boolean>, action: (params?: T | undefined) => Promise<R | undefined>] {
  const isLocked = useRef(false);

  const lockFn = useCallback(
    async function (params?: T) {
      if (isLocked.current) return;
      isLocked.current = true;
      try {
        const result = await fn(params);
        return result;
      } finally {
        isLocked.current = false;
      }
    },
    [fn],
  );

  return [isLocked, lockFn];
}

export default useAsyncLock;
