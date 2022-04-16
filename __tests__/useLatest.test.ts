import { Renderer, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useLatest from '../src/useLatest';

let app: RenderHookResult<any, React.MutableRefObject<any>, Renderer<any>>;

describe('useLatest', function () {
  beforeEach(function () {
    app = renderHook(
      function (state) {
        const value = useLatest(state);

        return value;
      },
      { initialProps: 0 },
    );
  });

  test('存储的值是正确的', function () {
    const { result } = app;

    expect(result.current.current).toBe(0);
  });

  test('存储的内容是最新的', function () {
    const { result, rerender } = app;

    expect(result.current.current).toBe(0);

    rerender(1);
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);

    function testFn() {}
    rerender(testFn);
    expect(result.current.current).toBe(testFn);

    const testObj = { a: 1 };
    rerender(testObj);
    expect(result.current.current).toBe(testObj);
  });
});
