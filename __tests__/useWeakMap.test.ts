import { useWeakMap } from '../src';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

describe('useWeakMap', function () {
  test('should return a WeakMap', function () {
    const { result } = renderHook(function () {
      return useWeakMap();
    });

    expect(result.current[0]).toBeInstanceOf(WeakMap);
  });

  test('should return a WeakMap with initial values', function () {
    const arr = [1, 2, 3];
    const obj = { a: 1 };

    const { result } = renderHook(function () {
      return useWeakMap<any, number>([
        [arr, 1],
        [obj, 2],
      ]);
    });

    expect(result.current[0]).toEqual(
      new WeakMap<any, any>([
        [arr, 1],
        [obj, 2],
      ]),
    );
  });

  test('set setAll has reset clear remove get is true', function () {
    const arr = [1, 2, 3];
    const obj = { a: 1 };
    const obj2 = { b: 1 };

    const { result } = renderHook(function () {
      return useWeakMap<any, number>([
        [arr, 1],
        [obj, 2],
      ]);
    });

    expect(result.current[1].has(arr)).toBe(true);
    expect(result.current[1].has([1, 2, 3])).toBe(false);

    act(function () {
      result.current[1].set(obj2, 3);
    });

    expect(result.current[1].has(obj2)).toBe(true);
    expect(result.current[1].get(obj2)).toBe(3);

    act(function () {
      result.current[1].clear();
    });

    expect(result.current[1].has(obj2)).toBe(false);
    expect(result.current[1].has(obj)).toBe(false);
    expect(result.current[1].has(arr)).toBe(false);

    act(function () {
      result.current[1].setAll([
        [arr, 1],
        [obj2, 2],
      ]);
    });

    expect(result.current[1].has(obj)).toBe(false);
    expect(result.current[1].has(obj2)).toBe(true);
    expect(result.current[1].has(arr)).toBe(true);
    expect(result.current[1].get(obj2)).toBe(2);

    act(function () {
      result.current[1].reset();
    });

    expect(result.current[1].has(obj2)).toBe(false);
    expect(result.current[1].has(obj)).toBe(true);
    expect(result.current[1].has(arr)).toBe(true);
    expect(result.current[1].get(obj)).toBe(2);
  });
});
