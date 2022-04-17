import { useMap } from '../src';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

describe('useMap', function () {
  test('should return a Map', function () {
    const { result } = renderHook(function () {
      return useMap();
    });

    expect(result.current[0]).toBeInstanceOf(Map);
  });

  test('should return a Map with the given initial values', function () {
    const { result } = renderHook(function () {
      return useMap([
        ['a', 1],
        ['b', 2],
      ]);
    });

    expect(result.current[0]).toBeInstanceOf(Map);
    expect(result.current[1].get('a')).toBe(1);
    expect(result.current[1].get('b')).toBe(2);
  });

  test('get values keys entries is fine', function () {
    const obj = { a: 1 };
    const arr = [1, 2, 3];

    const { result } = renderHook(function () {
      return useMap<any, number>([
        ['a', 1],
        ['b', 2],
        [obj, 3],
        [arr, 4],
      ]);
    });

    const [, { get, keys, values, entries }] = result.current;

    expect(get(obj)).toBe(3);
    expect(get(arr)).toBe(4);
    expect(Array.from(keys())).toEqual(['a', 'b', obj, arr]);
    expect(Array.from(values())).toEqual([1, 2, 3, 4]);
    expect(Array.from(entries())).toEqual([
      ['a', 1],
      ['b', 2],
      [obj, 3],
      [arr, 4],
    ]);
  });

  test('set setAll clear remove has size reset is fine', function () {
    const obj = { a: 1 };
    const arr = [1, 2, 3];

    const { result } = renderHook(function () {
      return useMap<any, number>([
        ['a', 1],
        ['b', 2],
        [obj, 3],
        [arr, 4],
      ]);
    });

    expect(result.current[1].size()).toBe(4);

    act(function () {
      result.current[1].set('c', 5);
    });
    expect(result.current[1].size()).toBe(5);

    act(function () {
      result.current[1].setAll([
        ['d', 6],
        ['e', 7],
      ]);
    });
    expect(result.current[1].size()).toBe(7);

    expect(result.current[1].has('a')).toBe(true);
    expect(result.current[1].has('ww')).toBe(false);
    expect(result.current[1].has(obj)).toBe(true);

    act(function () {
      result.current[1].clear();
    });
    expect(result.current[1].size()).toBe(0);

    act(function () {
      result.current[1].reset();
    });

    expect(result.current[1].size()).toBe(4);
    expect(Array.from(result.current[1].entries())).toEqual([
      ['a', 1],
      ['b', 2],
      [obj, 3],
      [arr, 4],
    ]);

    act(function () {
      result.current[1].remove('a');
    });

    expect(result.current[1].size()).toBe(3);
    expect(Array.from(result.current[1].entries())).toEqual([
      ['b', 2],
      [obj, 3],
      [arr, 4],
    ]);

    act(function () {
      result.current[1].remove(obj);
    });
    expect(result.current[1].size()).toBe(2);
    expect(Array.from(result.current[1].entries())).toEqual([
      ['b', 2],
      [arr, 4],
    ]);
  });
});
