import React, { FC, Suspense, useEffect, useReducer, useState } from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import useSuspense from '../src/useSuspense';

const fn = jest.fn();

const Loading: FC = function () {
  useEffect(fn, []);

  return <p>loading...</p>;
};

describe('useSuspense', function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });

  test('测试suspense是否正常', async function () {
    const App: FC = function () {
      const data = useSuspense('key', async function () {
        return 2;
      });

      return <p data-testid='data'>{data}</p>;
    };

    const { findByTestId } = render(
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>,
    );

    const text = await findByTestId('data');

    expect(text.innerHTML).toBe('2');
    expect(fn).toBeCalled();
    expect(fn).toBeCalledTimes(1);
  });

  test('key值不变rerender后不会重新触发内容,key值为一个string类型', async function () {
    const App: FC = function () {
      const data = useSuspense('testKey', async function () {
        return Math.random();
      });
      const [, forceUpdate] = useReducer((num: number) => num + 1, 0);

      return (
        <>
          <p data-testid='data'>{data}</p>
          <button data-testid='btn' onClick={forceUpdate}>
            force
          </button>
        </>
      );
    };

    const { findByTestId } = render(
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>,
    );

    let text = await findByTestId('data');
    const btn = await findByTestId('btn');

    const textHtml = text.innerHTML;

    await act(async function () {
      fireEvent.click(btn);
      text = await findByTestId('data');
    });

    expect(text.innerHTML).toBe(textHtml);

    expect(fn).toBeCalledTimes(1);
  });

  test('key值不变rerender后不会重新触发内容,key值为一个stringArray类型', async function () {
    const App: FC = function () {
      const data = useSuspense(['key', 'key2'], async function () {
        return Math.random();
      });
      const [, forceUpdate] = useReducer((num: number) => num + 1, 0);

      return (
        <>
          <p data-testid='data'>{data}</p>
          <button data-testid='btn' onClick={forceUpdate}>
            force
          </button>
        </>
      );
    };

    const { findByTestId } = render(
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>,
    );

    let text = await findByTestId('data');
    const btn = await findByTestId('btn');

    const textHtml = text.innerHTML;

    await act(async function () {
      fireEvent.click(btn);
      text = await findByTestId('data');
    });

    expect(text.innerHTML).toBe(textHtml);

    expect(fn).toBeCalledTimes(1);
  });

  test('key值修改后,内容对应调整,key为array类型', async function () {
    const App: FC = function () {
      const [key, setKey] = useState(1);

      const data = useSuspense(['key', key], async function () {
        return Math.random();
      });

      function handle() {
        setKey(v => v + 1);
      }

      return (
        <>
          <p data-testid='data'>{data}</p>
          <button data-testid='btn' onClick={handle}>
            force
          </button>
        </>
      );
    };

    const { findByTestId } = render(
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>,
    );

    let text = await findByTestId('data');
    const btn = await findByTestId('btn');

    let textHtml = text.innerHTML;
    expect(text.innerHTML).toBe(textHtml);

    await act(async function () {
      fireEvent.click(btn);
      text = await findByTestId('data');
    });

    expect(text.innerHTML).not.toBe(textHtml);
    textHtml = text.innerHTML;

    await act(async function () {
      fireEvent.click(btn);
      text = await findByTestId('data');
    });

    expect(text.innerHTML).not.toBe(textHtml);

    expect(fn).toBeCalledTimes(3);
  });

  test('key值修改后,内容对应调整,key为string类型', async function () {
    const App: FC = function () {
      const [key, setKey] = useState('valuekey');

      const data = useSuspense(key, async function () {
        return key;
      });

      function handle() {
        setKey(v => v + '1');
      }

      return (
        <>
          <p data-testid='data'>{data}</p>
          <button data-testid='btn' onClick={handle}>
            force
          </button>
        </>
      );
    };

    const { findByTestId } = render(
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>,
    );

    let text = await findByTestId('data');
    const btn = await findByTestId('btn');

    expect(text.innerHTML).toBe('valuekey');

    await act(async function () {
      fireEvent.click(btn);
      text = await findByTestId('data');
    });
    expect(text.innerHTML).toBe('valuekey1');

    await act(async function () {
      fireEvent.click(btn);
      text = await findByTestId('data');
    });
    expect(text.innerHTML).toBe('valuekey11');

    expect(fn).toBeCalledTimes(3);
  });
});
