import { useMemo } from 'react';
import { isNumber } from './utils';

/**
 * 货币金额格式化
 *
 * @example
 *
 * const money = useMoneyFormat(12345.6789, 2);
 *
 * console.log(money); // 12.345.68
 */
function useMoneyFormat(target: string, fractionDigits?: number): string;
function useMoneyFormat(target: number, fractionDigits?: number): string;
function useMoneyFormat(target: number | string, fractionDigits?: number): string;
function useMoneyFormat(target: number | string, fractionDigits?: number): string {
  return useMemo(
    function () {
      const money = isNumber(target) ? target : Number(target);
      return money.toFixed(fractionDigits).replace(/\B(?=(\d{3})+\b)/g, ',');
    },
    [target, fractionDigits],
  );
}

export default useMoneyFormat;
