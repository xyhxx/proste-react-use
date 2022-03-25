import { renderHook } from '@testing-library/react-hooks';
import useBeforeMount from '../src/useBeforeMount';

const callback = jest.fn();

beforeEach(function () {
  jest.clearAllMocks();
});

test('可以正常触发', function () {
  renderHook(function () {
    useBeforeMount(callback);
  });

  expect(callback).toHaveBeenCalledTimes(1);
});

test('只触发一次', function () {
  const { rerender } = renderHook(function () {
    useBeforeMount(callback);
  });

  expect(callback).toHaveBeenCalledTimes(1);

  rerender();

  expect(callback).toHaveBeenCalledTimes(1);
});

test('卸载组件不触发', function () {
  const { unmount } = renderHook(function () {
    useBeforeMount(callback);
  });

  expect(callback).toHaveBeenCalledTimes(1);

  unmount();

  expect(callback).toHaveBeenCalledTimes(1);
});
