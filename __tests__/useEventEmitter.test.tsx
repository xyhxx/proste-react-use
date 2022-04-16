import { fireEvent, render, RenderResult } from '@testing-library/react';
import React, { FC, useCallback, useState } from 'react';
import { act } from 'react-test-renderer';
import useEventEmitter from '../src/useEventEmitter';

let app: RenderResult<
  typeof import('D:/studyCode/plugin/proste-taro-hooks/node_modules/@testing-library/dom/types/queries'),
  HTMLElement,
  HTMLElement
>;

const KEY = 'test';

describe('useEventEmitter', function () {
  beforeEach(function () {
    const Son1: FC = function () {
      const [state, setState] = useState(0);

      const listener = useCallback(function (e) {
        setState(v => v + (e ?? 1));
      }, []);

      useEventEmitter<number | undefined>(KEY, listener);

      return (
        <>
          <p data-testid='son1_state'>{state}</p>
        </>
      );
    };
    const Son2: FC = function () {
      const [state, setState] = useState(0);

      const listener = useCallback(function (e) {
        setState(v => v + (e ?? 1));
      }, []);

      useEventEmitter<number | undefined>(KEY, listener, true);

      return (
        <>
          <p data-testid='son2_state'>{state}</p>
        </>
      );
    };
    const Son3: FC = function () {
      const fire = useEventEmitter(KEY);
      const fireNumber = useEventEmitter<number>(KEY);

      return (
        <>
          <button data-testid='btn' onClick={() => fire()}></button>
          <button data-testid='btn_number' onClick={() => fireNumber(2)}></button>
        </>
      );
    };
    const Wrapper: FC = () => (
      <>
        <Son1 />
        <Son2 />
        <Son3 />
      </>
    );

    app = render(<Wrapper />);
  });

  test('测试监听正常', async function () {
    const { getByTestId } = app;

    const btn = await getByTestId('btn');
    const state1 = await getByTestId('son1_state');
    const state2 = await getByTestId('son2_state');

    expect(state1.textContent).toBe('0');
    expect(state2.textContent).toBe('0');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('1');
    expect(state2.textContent).toBe('1');
  });

  test('once属性为true只监听一次', async function () {
    const { getByTestId } = app;

    const btn = await getByTestId('btn_number');
    const state1 = await getByTestId('son1_state');
    const state2 = await getByTestId('son2_state');

    expect(state1.textContent).toBe('0');
    expect(state2.textContent).toBe('0');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('2');
    expect(state2.textContent).toBe('2');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('4');
    expect(state2.textContent).toBe('2');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('6');
    expect(state2.textContent).toBe('2');
  });

  test('监听传参正常', async function () {
    const { getByTestId } = app;

    const btn = await getByTestId('btn');
    const state1 = await getByTestId('son1_state');
    const state2 = await getByTestId('son2_state');

    expect(state1.textContent).toBe('0');
    expect(state2.textContent).toBe('0');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('1');
    expect(state2.textContent).toBe('1');
  });

  test('更新时正常销毁，或者说回调触发数量与操作数量相同', async function () {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const Son1: FC = function () {
      const [state, setState] = useState(0);

      useEventEmitter<number | undefined>('KEY', function (e) {
        setState(v => v + (e ?? 1));
        fn1();
      });

      return (
        <>
          <p data-testid='son1_state'>{state}</p>
        </>
      );
    };
    const Son2: FC = function () {
      const [state, setState] = useState(0);

      useEventEmitter<number | undefined>(
        'KEY2',
        function (e) {
          setState(v => v + (e ?? 1));
          fn2();
        },
        true,
      );

      return (
        <>
          <p data-testid='son2_state'>{state}</p>
        </>
      );
    };
    const Son3: FC = function () {
      const fire = useEventEmitter('KEY');
      const fireNumber = useEventEmitter<number>('KEY2');

      return (
        <>
          <button data-testid='btns' onClick={() => fire()}></button>
          <button data-testid='btns_number' onClick={() => fireNumber(2)}></button>
        </>
      );
    };
    const Wrapper: FC = () => (
      <>
        <Son1 />
        <Son2 />
        <Son3 />
      </>
    );

    const { findByTestId } = render(<Wrapper />);

    const btn = await findByTestId('btns');
    const btn2 = await findByTestId('btns_number');

    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();

    act(function () {
      fireEvent.click(btn);
    });

    expect(fn1).toBeCalledTimes(1);
    expect(fn2).not.toBeCalled();

    act(function () {
      fireEvent.click(btn);
      fireEvent.click(btn2);
    });

    expect(fn1).toBeCalledTimes(2);
    expect(fn2).toBeCalledTimes(1);

    act(function () {
      fireEvent.click(btn);
      fireEvent.click(btn2);
    });

    expect(fn1).toBeCalledTimes(3);
    expect(fn2).toBeCalledTimes(1);
  });
});
