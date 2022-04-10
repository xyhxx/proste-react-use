export type EasingFunction = (x: number) => number;
export type EasingList = [number, number, number, number];
export type EasingFunctionOrList = EasingFunction | EasingList;

const { pow, sin } = Math;

/**
 * 相关数据参考：
 * https://github.com/ai/easings.net
 *
 * 如果你想自定义自己的缓动函数，可以使用此网址
 * https://cubic-bezier.com
 */
export const LINEAR: EasingList = [1, 1, 1, 1];
export const EASE_IN_SINE: EasingList = [0.12, 0, 0.39, 0];
export const EASE_OUT_SINE: EasingList = [0.61, 1, 0.88, 1];
export const EASE_IN_OUT_SINE: EasingList = [0.37, 0, 0.63, 1];
export const EASE_IN_QUAD: EasingList = [0.11, 0, 0.5, 0];
export const EASE_OUT_QUAD: EasingList = [0.5, 1, 0.89, 1];
export const EASE_IN_OUT_QUAD: EasingList = [0.45, 0, 0.55, 1];
export const EASE_IN_CUBIC: EasingList = [0.32, 0, 0.67, 0];
export const EASE_OUT_CUBIC: EasingList = [0.33, 1, 0.68, 1];
export const EASE_IN_OUT_CUBIC: EasingList = [0.65, 0, 0.35, 1];
export const EASE_IN_QUART: EasingList = [0.5, 0, 0.75, 0];
export const EASE_OUT_QUART: EasingList = [0.25, 1, 0.5, 1];
export const EASE_IN_OUT_QUART: EasingList = [0.76, 0, 0.24, 1];
export const EASE_IN_QUINT: EasingList = [0.64, 0, 0.78, 0];
export const EASE_OUT_QUINT: EasingList = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT_QUINT: EasingList = [0.83, 0, 0.17, 1];
export const EASE_IN_EXPO: EasingList = [0.7, 0, 0.84, 0];
export const EASE_OUT_EXPO: EasingList = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_EXPO: EasingList = [0.87, 0, 0.13, 1];
export const EASE_IN_CIRC: EasingList = [0.55, 0, 1, 0.45];
export const EASE_OUT_CIRC: EasingList = [0, 0.55, 0.45, 1];
export const EASE_IN_OUT_CIRC: EasingList = [0.85, 0, 0.15, 1];
export const EASE_IN_BLACK: EasingList = [0.36, 0, 0.66, -0.56];
export const EASE_OUT_BLACK: EasingList = [0.34, 1.56, 0.64, 1];
export const EASE_IN_OUT_BLACK: EasingList = [0.68, -0.6, 0.32, 1.6];
export const EASE_IN_ELASTIC: EasingFunction = function (x) {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
};
export const EASE_OUT_ELASTIC: EasingFunction = function (x) {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
};
export const EASE_IN_OUT_ELASTIC: EasingFunction = function (x) {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
    : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
};
export const EASE_OUT_BOUNCE: EasingFunction = function (v) {
  const n1 = 7.5625;
  const d1 = 2.75;
  let x = v;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  }
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
};
export const EASE_IN_BOUNCE: EasingFunction = function (x) {
  // eslint-disable-next-line new-cap
  return 1 - EASE_OUT_BOUNCE(1 - x);
};
export const EASE_IN_OUT_BOUNCE: EasingFunction = function (x) {
  // eslint-disable-next-line new-cap
  return x < 0.5 ? (1 - EASE_OUT_BOUNCE(1 - 2 * x)) / 2 : (1 + EASE_OUT_BOUNCE(2 * x - 1)) / 2;
};
