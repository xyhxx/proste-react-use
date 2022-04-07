import { useLayoutEffect, useState } from 'react';

export type MemoryInfo = {
  /** 上下文内可用堆的最大体积，以字节计算。 jsHeapSizeLimit / 1000000 = MB */
  jsHeapSizeLimit: number;
  /**  已分配的堆体积，以字节计算。 totalJSHeapSize / 1000000 = MB */
  totalJSHeapSize: number;
  /** 当前 JS 堆活跃段（segment）的体积，以字节计算。 usedJSHeapSize / 1000000 = MB */
  usedJSHeapSize: number;
};

type PerformanceType = Performance & { memory: MemoryInfo };

/**
 * 获取当前内存信息
 * 当前页面不支持performance是所有值都为0
 * performance.memory是谷歌浏览器提供的非标准扩展，注意使用方式
 *
 * @example
 *
 * const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = useMemory();
 */
function useMemory(interval?: number) {
  const [state, setState] = useState<MemoryInfo>(function () {
    if (performance) {
      return (performance as PerformanceType).memory;
    }

    return { jsHeapSizeLimit: 0, totalJSHeapSize: 0, usedJSHeapSize: 0 };
  });

  useLayoutEffect(
    function () {
      if (!performance) return;

      if (!interval || interval <= 0) return;

      const timer = setInterval(function () {
        setState((performance as PerformanceType).memory);
      }, interval);

      return function () {
        clearInterval(timer);
      };
    },
    [interval],
  );

  return state;
}

export default useMemory;
