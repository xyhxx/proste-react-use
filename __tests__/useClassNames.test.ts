import { useClassNames } from '../src';
import { renderHook } from '@testing-library/react-hooks';

describe('useClassNames', function () {
  test('多字符串正常', function () {
    const { result } = renderHook(function () {
      return useClassNames()('a', 'b', 'c');
    });

    expect(result.current).toBe('a b c');
  });

  test('数组正常', function () {
    const { result } = renderHook(function () {
      return useClassNames()(['a', 'b', 'c', 'd']);
    });

    expect(result.current).toBe('a b c d');
  });

  test('对象类型正常', function () {
    const { result } = renderHook(function () {
      return useClassNames()({
        a: true,
        b: false,
        c: true,
        d: 2 > 0,
        e: 2,
        f: 0,
        j: '',
        h: [],
        i: {},
        g: () => true,
        k: () => false,
      });
    });

    expect(result.current).toBe('a c d e h i g');
  });
});
