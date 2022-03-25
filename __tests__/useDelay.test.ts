import useDelay from '../src/useDelay';
import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

jest.useFakeTimers();

test('会延迟触发的方法', function () {
  const { result } = renderHook<unknown, [number, () => void]>(function () {
    const [state, setState] = useState(0);
    const delay = useDelay(function () {
      act(function () {
        setState(1);
      });
    }, 2000);

    return [state, delay];
  });

  expect(result.current[0]).toBe(0);
  result.current[1]();
  expect(result.current[0]).toBe(0);

  jest.runAllTimers();

  expect(result.current[0]).toBe(1);
});
