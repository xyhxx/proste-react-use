import { renderHook } from '@testing-library/react-hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { act } from 'react-test-renderer';
import useMoneyFormat from '../src/useMoneyFormat';

describe('useMoneyFormat', function () {
  test('测试金额（无小数点后）', function () {
    const { result } = renderHook<unknown, [string, Dispatch<SetStateAction<string | number>>]>(
      function () {
        const [state, setState] = useState<number | string>(100);

        const money = useMoneyFormat(state);

        return [money, setState];
      },
    );

    const [, setState] = result.current;

    expect(result.current[0]).toBe('100');

    act(function () {
      setState(-98);
    });

    expect(result.current[0]).toBe('-98');

    act(function () {
      setState(1000);
    });

    expect(result.current[0]).toBe('1,000');

    act(function () {
      setState(12345.6789);
    });

    expect(result.current[0]).toBe('12,346');

    act(function () {
      setState(-12345.6789);
    });

    expect(result.current[0]).toBe('-12,346');
  });

  test('测试金额（包含小数点）', function () {
    const { result } = renderHook<unknown, [string, Dispatch<SetStateAction<string | number>>]>(
      function () {
        const [state, setState] = useState<number | string>(100);

        const money = useMoneyFormat(state, 2);

        return [money, setState];
      },
    );

    const [, setState] = result.current;

    expect(result.current[0]).toBe('100.00');

    act(function () {
      setState(-98);
    });

    expect(result.current[0]).toBe('-98.00');

    act(function () {
      setState(1000);
    });

    expect(result.current[0]).toBe('1,000.00');

    act(function () {
      setState('12345.6789');
    });

    expect(result.current[0]).toBe('12,345.68');

    act(function () {
      setState('-12345.6789');
    });

    expect(result.current[0]).toBe('-12,345.68');
  });
});
