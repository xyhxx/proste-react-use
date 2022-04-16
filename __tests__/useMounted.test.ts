import { renderHook } from '@testing-library/react-hooks';
import useMounted from '../src/useMounted';

const callback = jest.fn();

describe('useMounted', function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });

  test('可以正常触发', function () {
    renderHook(function () {
      useMounted(callback);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('只触发一次', function () {
    const { rerender } = renderHook(function () {
      useMounted(callback);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('卸载组件不触发', function () {
    const { unmount } = renderHook(function () {
      useMounted(callback);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
