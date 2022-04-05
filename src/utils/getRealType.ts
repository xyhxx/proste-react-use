/*
 * @Description: 通过Objext.prototype.toString
 * @FilePath: /proste-react-use/src/utils/getRealType.ts
 */
const getType = Object.prototype.toString;

function getRealType(source: any) {
  if (source === null || source === void 0) {
    return source === void 0 ? '[object Undefined]' : '[object Null]';
  }
  return getType.call(source);
}

export default getRealType;
