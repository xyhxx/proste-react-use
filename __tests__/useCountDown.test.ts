import { renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import { act } from 'react-test-renderer';
import { useCountDown, UseCountDownOptions } from '../src';

function setup(options?: UseCountDownOptions) {
  return renderHook(() => useCountDown(options));
}

describe('useCountDown', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  });

  test('测试默认值是否正常', function () {
    const { result, rerender } = setup();

    let { days, hours, minutes, seconds, milliseconds } = result.current;

    expect({ days, hours, minutes, seconds, milliseconds }).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    act(function () {
      rerender();
    });

    ({ days, hours, minutes, seconds, milliseconds } = result.current);
  });

  test('测试参数是否正常', function () {
    const { result } = setup({ hours: 1, days: 1, minutes: 2, seconds: 3 });

    const { days, hours, minutes, seconds } = result.current;

    expect({ days, hours, minutes, seconds }).toEqual({
      days: 1,
      hours: 1,
      minutes: 2,
      seconds: 3,
    });
  });

  test('测试进程是否正常', function () {
    const { result } = setup({ targetDate: dayjs().add(3, 'd').toDate(), interval: 500 });

    let { days, hours, minutes, seconds, milliseconds } = result.current;

    expect({ days, hours, minutes, seconds, milliseconds }).toEqual({
      days: 3,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    act(function () {
      jest.advanceTimersByTime(1000);
    });

    ({ days, hours, minutes, seconds, milliseconds } = result.current);

    expect({ days, hours, minutes }).toEqual({
      days: 2,
      hours: 23,
      minutes: 59,
    });

    expect(seconds).toBeLessThanOrEqual(59);
    expect(milliseconds).toBeLessThan(1000);

    act(function () {
      jest.advanceTimersByTime(1000 * 60 * 3);
    });

    ({ days, hours, minutes, seconds, milliseconds } = result.current);

    expect({ days, hours, minutes }).toEqual({
      days: 2,
      hours: 23,
      minutes: 56,
    });

    expect(seconds).toBeLessThanOrEqual(59);
    expect(milliseconds).toBeLessThan(1000);
  });

  test('测试完成回调是否正常', function () {
    const completeFn = jest.fn();
    const changeFn = jest.fn();

    setup({
      onChange: changeFn,
      onComplete: completeFn,
      targetDate: dayjs().add(3, 's').toDate(),
      interval: 100,
    });

    expect(completeFn).not.toBeCalled();
    expect(changeFn).toHaveBeenCalledTimes(1);

    act(function () {
      jest.advanceTimersByTime(1000);
    });

    expect(completeFn).not.toBeCalled();
    expect(changeFn).toHaveBeenCalledTimes(11);

    act(function () {
      jest.advanceTimersByTime(1000 * 2);
    });

    expect(completeFn).toBeCalled();
    expect(changeFn).toHaveBeenCalledTimes(31);
  });
});
