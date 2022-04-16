import { useCallback } from 'react';
import { isFunction } from './utils';

type ObjectClassNames = Record<string, unknown>;
type ClassNamesArgs = Array<ObjectClassNames | string | ClassNamesArgs>;

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
function useClassNames() {
  const parseClassNames = useCallback(function (...args: ClassNamesArgs) {
    const classNames: string[] = [];

    args.forEach(function (val) {
      if (typeof val === 'string') {
        classNames.push(val);
      } else if (Array.isArray(val)) {
        const result = parseClassNames(...val);
        classNames.push(result);
      } else {
        Object.keys(val).forEach(function (key) {
          const value = val[key];
          const result = isFunction(value) ? value() : value;
          if (result) {
            classNames.push(key);
          }
        });
      }
    });

    return classNames.join(' ');
  }, []);

  return parseClassNames;
}

export default useClassNames;
