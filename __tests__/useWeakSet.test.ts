import { useWeakSet } from '../src';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

describe('useWeakSet', function () {
  test('should return a WeakSet', function () {
    const { result } = renderHook(function () {
      return useWeakSet();
    });

    expect(result.current[0]).toBeInstanceOf(WeakSet);
  });

  test('should return a WeakSet with initial values', function () {
    const arr = [1, 2, 3];
    const obj = { a: 1 };

    const { result } = renderHook(function () {
      return useWeakSet([arr, obj]);
    });

    expect(result.current[0]).toEqual(new WeakSet([arr, obj]));
  });

  test('add clear addAll has reset remove is fine', function () {
    const arr = [1, 2, 3];
    const obj = { a: 1 };

    const { result } = renderHook(function () {
      return useWeakSet<any>([arr]);
    });

    expect(result.current[1].has(arr)).toBe(true);
    expect(result.current[1].has([1, 2, 3])).toBe(false);

    act(function () {
      result.current[1].add(obj);
    });

    expect(result.current[1].has(obj)).toBe(true);

    act(function () {
      result.current[1].clear();
    });

    expect(result.current[1].has(obj)).toBe(false);
    expect(result.current[1].has(arr)).toBe(false);

    act(function () {
      result.current[1].addAll([arr, obj]);
    });

    expect(result.current[1].has(obj)).toBe(true);
    expect(result.current[1].has(arr)).toBe(true);

    act(function () {
      result.current[1].remove(arr);
    });

    expect(result.current[1].has(obj)).toBe(true);
    expect(result.current[1].has(arr)).toBe(false);

    act(function () {
      result.current[1].reset();
    });

    expect(result.current[1].has(obj)).toBe(false);
    expect(result.current[1].has(arr)).toBe(true);
  });
});
