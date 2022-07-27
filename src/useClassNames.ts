import { useCallback, useMemo } from 'react';
import { isFunction } from './utils';

type ObjectClassNames = Record<string, unknown>;
type ClassNamesArgs = Array<ObjectClassNames | string | null | undefined | ClassNamesArgs>;
type CSSModuleClasses = Record<string, string>;
type UseClassNameOptions = {
  prefix?: string;
  styleSheet?: CSSModuleClasses;
  camelTransition?: string;
};

function transition(source: string, prefix?: string) {
  if (!prefix) return source;

  const result = source.replace(/[A-Z]/g, function (val) {
    return prefix + val.toLowerCase();
  });

  if (result[0] === prefix) {
    return result.slice(1);
  }

  return result;
}

/**
 * 将各种类型的数据合并成一个 string 类型返回用于className
 *
 * @example
 *
 * const classNames = useClassNames();
 *
 * classNames('a', 'b', { c: true, d: false }); // 'a b c'
 * classNames(['a', 'b']); // 'a b'
 * classNames({a: () => true, b: () => false}); // 'a'
 */
function useClassNames(options?: UseClassNameOptions) {
  const { prefix, styleSheet, camelTransition } = options ?? {};

  const style = useMemo(
    function () {
      return new Proxy(styleSheet ?? {}, {
        get(target, key, receiver) {
          if (typeof key === 'symbol') return '';
          const name = transition(key, camelTransition);
          const value = Reflect.get(target, name, receiver);

          if (!value) return '';

          const prefixStr = prefix ?? '';
          return prefixStr + value;
        },
      });
    },
    [prefix, styleSheet, camelTransition],
  );

  const parseClassNames = useCallback(function (...args: ClassNamesArgs) {
    const classNames: string[] = [];

    args.forEach(function (val) {
      if (typeof val === 'string') {
        classNames.push(val);
      } else if (Array.isArray(val)) {
        const result = parseClassNames(...val);
        classNames.push(result);
      } else {
        for (const key in val) {
          if (!Object.prototype.hasOwnProperty.call(val, key)) continue;
          const value = val[key];
          const result = isFunction(value) ? value() : value;
          if (result) {
            classNames.push(key);
          }
        }
      }
    });

    return classNames.join(' ');
  }, []);

  return [style, parseClassNames] as const;
}

export default useClassNames;
