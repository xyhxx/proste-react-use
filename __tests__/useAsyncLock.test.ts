import { renderHook } from '@testing-library/react-hooks';
import { useCallback } from 'react';
import useAsyncLock from '../src/useAsyncLock';

const mock = jest.fn();

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

beforeEach(function () {
  mock.mockClear();
});

test('useAsyncLock', async function () {
  const {
    result: {
      current: [isLoceed, asyncLockFn],
    },
  } = renderHook(function () {
    const fn = useCallback(function () {
      mock();
      return new Promise(function (res) {
        setTimeout(function () {
          res('');
        }, 2000);
      });
    }, []);

    return useAsyncLock(fn);
  });

  expect(mock).not.toBeCalled();
  expect(isLoceed.current).toBe(false);

  asyncLockFn();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(isLoceed.current).toBe(true);

  await sleep(500);
  asyncLockFn();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(isLoceed.current).toBe(true);

  await sleep(500);
  asyncLockFn();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(isLoceed.current).toBe(true);

  await sleep(1000);
  expect(isLoceed.current).toBe(false);

  asyncLockFn();
  expect(mock).toHaveBeenCalledTimes(2);
  expect(isLoceed.current).toBe(true);

  asyncLockFn();
  expect(mock).toHaveBeenCalledTimes(2);
  expect(isLoceed.current).toBe(true);
});
