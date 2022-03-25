import useUpdateEffect from '../src/useUpdateEffect';
import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

const fn = jest.fn();

test('只有在更新时触发hooks, 第一次不触发', function () {
  const { result } = renderHook(function () {
    const [state, setState] = useState(0);

    useUpdateEffect(fn, [state]);

    return function () {
      setState(v => v + 1);
    };
  });

  expect(fn).toHaveBeenCalledTimes(0);
  act(function () {
    result.current();
  });
  expect(fn).toHaveBeenCalledTimes(1);
  act(function () {
    result.current();
  });
  expect(fn).toHaveBeenCalledTimes(2);
});
