/*
 * @Description: 判断是否是Function类型
 * @FilePath: /proste-react-use/src/utils/isFunction.ts
 */
function isFunction(source: unknown): source is Function {
  return typeof source === 'function';
}

export default isFunction;
