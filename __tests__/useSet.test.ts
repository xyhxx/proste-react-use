import { useSet } from '../src';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

describe('useSet', function () {
  test('should return a Set', function () {
    const { result } = renderHook(function () {
      return useSet();
    });

    expect(result.current[0]).toBeInstanceOf(Set);
  });

  test('should return a Set with the given values', function () {
    const { result } = renderHook(function () {
      return useSet(['a', 'b', 'c']);
    });

    expect(result.current[0]).toEqual(new Set(['a', 'b', 'c']));

    expect(Array.from(result.current[1].values())).toEqual(['a', 'b', 'c']);
  });

  test('set setAll has size remove clear reset is fine', function () {
    const obj = { a: 1 };
    const arr = [1, 2, 3];
    const { result } = renderHook(function () {
      return useSet<any>(['a', 'b', 'c']);
    });

    expect(result.current[1].has('a')).toBe(true);
    expect(result.current[1].has('d')).toBe(false);
    expect(result.current[1].size()).toBe(3);

    act(function () {
      result.current[1].add(obj);
    });

    expect(result.current[1].has(obj)).toBe(true);
    expect(result.current[1].size()).toBe(4);

    act(function () {
      result.current[1].remove(obj);
    });

    expect(result.current[1].has(obj)).toBe(false);
    expect(result.current[1].size()).toBe(3);

    act(function () {
      result.current[1].addAll([obj, arr]);
    });

    expect(result.current[1].has(obj)).toBe(true);
    expect(result.current[1].has(arr)).toBe(true);
    expect(result.current[1].size()).toBe(5);

    act(function () {
      result.current[1].clear();
    });

    expect(result.current[1].size()).toBe(0);

    act(function () {
      result.current[1].reset();
    });

    expect(result.current[1].size()).toBe(3);
    expect(result.current[1].has(obj)).toBe(false);
    expect(result.current[1].has('a')).toBe(true);
  });
});
