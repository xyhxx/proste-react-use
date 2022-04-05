/*
 * @Description: 是否是string类型
 * @FilePath: /proste-react-use/src/utils/isString.ts
 */

import getRealType from './getRealType';

function isString(value: unknown): value is string {
  const type = typeof value;
  return (
    type === 'string' ||
    (type === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      getRealType(value) === '[object String]')
  );
}

export default isString;
