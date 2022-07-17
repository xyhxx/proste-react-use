import { useClassNames } from '../src';
import { renderHook } from '@testing-library/react-hooks';

const mockClass = {
  title: 'title',
  'line-title': 'line-title',
  camelTitle: 'camelTitle',
};

describe('useClassNames', function () {
  test('多字符串正常', function () {
    const { result } = renderHook(function () {
      const [_, cls] = useClassNames();
      return cls('a', 'b', 'c', null, undefined);
    });

    expect(result.current).toBe('a b c');
  });

  test('数组正常', function () {
    const { result } = renderHook(function () {
      const [_, cls] = useClassNames();

      return cls(['a', 'b', 'c', 'd', null, undefined]);
    });

    expect(result.current).toBe('a b c d');
  });

  test('对象类型正常', function () {
    const { result } = renderHook(function () {
      const [_, cls] = useClassNames();

      return cls({
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
        o: null,
        p: undefined,
        q: () => null,
      });
    });

    expect(result.current).toBe('a c d e h i g');
  });

  test('解析module.css', function () {
    const { result } = renderHook(function () {
      const [style] = useClassNames({ styleSheet: mockClass });

      return style;
    });

    expect(result.current.title).toBe('title');
    expect(result.current.camelTitle).toBe('camelTitle');
  });

  test('解析module.css添加prefix', function () {
    const { result } = renderHook(function () {
      const [style] = useClassNames({ styleSheet: mockClass, prefix: 'info-' });

      return style;
    });

    expect(result.current.title).toBe('info-title');
    expect(result.current.camelTitle).toBe('info-camelTitle');
  });

  test('解析module.css 转换驼峰写法', function () {
    const { result } = renderHook(function () {
      const [style] = useClassNames({ styleSheet: mockClass, camelTransition: '-' });

      return style;
    });

    expect(result.current.title).toBe('title');
    expect(result.current.lineTitle).toBe('line-title');
  });
});
