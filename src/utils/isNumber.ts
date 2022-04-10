import getRealType from './getRealType';

function isNumber(value: unknown): value is number {
  return typeof value === 'number' || getRealType(value) === '[object Number]';
}

export default isNumber;
