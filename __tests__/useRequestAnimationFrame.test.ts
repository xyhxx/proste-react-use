import { renderHook } from '@testing-library/react-hooks';
import useRequestAnimationFrame from '../src/useRequestAnimationFrame';

const fn = jest.fn();

beforeEach(function () {
  fn.mockClear();
});

test('auto设置为false时不会主动触发', function () {
  const { result } = renderHook(() => useRequestAnimationFrame(fn));

  expect(result.current.isActive()).toBe(false);
  expect(fn).not.toBeCalled();
});

test('auto设置为true时会主动触发', function () {
  jest.useFakeTimers();
  const { result } = renderHook(() => useRequestAnimationFrame(fn, true));

  expect(fn).not.toBeCalled();

  jest.advanceTimersByTime(1000);

  expect(result.current.isActive()).toBe(true);
  expect(fn).toBeCalled();
});

test('暂停和继续正常触发', function () {
  jest.useFakeTimers();
  const { result } = renderHook(() => useRequestAnimationFrame(fn, false));

  expect(fn).not.toBeCalled();
  expect(result.current.isActive()).toBe(false);

  jest.advanceTimersByTime(1000);

  expect(fn).not.toBeCalled();
  expect(result.current.isActive()).toBe(false);

  result.current.resume();

  jest.advanceTimersByTime(1000);

  expect(fn).toBeCalled();
  expect(result.current.isActive()).toBe(true);

  result.current.pause();

  jest.advanceTimersByTime(1000);
  expect(fn).toBeCalled();
  expect(result.current.isActive()).toBe(false);
});
