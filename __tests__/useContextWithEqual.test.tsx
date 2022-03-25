import React, { Dispatch, FC, useEffect, useReducer } from 'react';
import { createContext } from 'use-context-selector';
import useContextWithEqual from '../src/useContextWithEqual';
import { fireEvent, render, RenderResult } from '@testing-library/react';

type State = ReturnType<typeof state>;
type Action = { type: 'inc' } | { type: 'add' };

function state() {
  return {
    count: 0,
    num: 0,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + 1 };
    case 'add':
      return { ...state, num: state.num + 1 };
    default:
      return state;
  }
}

let app: RenderResult<
  typeof import('D:/studyCode/plugin/proste-taro-hooks/node_modules/@testing-library/dom/types/queries'),
  HTMLElement,
  HTMLElement
>;

const fn = jest.fn();

beforeEach(function () {
  jest.clearAllMocks();
  const context = createContext<[State, Dispatch<Action>]>([state(), () => null]);

  const Chil: FC = function () {
    const result = useContextWithEqual<[State, Dispatch<Action>], [number, Dispatch<Action>]>(
      context,
      function (c) {
        return [c[0].count, c[1]];
      },
    );

    function inc() {
      result[1]({ type: 'inc' });
    }

    function add() {
      result[1]({ type: 'add' });
    }

    useEffect(
      function () {
        fn();
      },
      [result],
    );

    return (
      <>
        <p data-testid='count'>{result[0]}</p>
        <button data-testid='inc' onClick={inc}>
          inc
        </button>
        <button data-testid='add' onClick={add}>
          add
        </button>
      </>
    );
  };

  const Father: FC = function ({ children }) {
    const providerState = useReducer(reducer, state());
    const { Provider } = context;

    return <Provider value={providerState}>{children}</Provider>;
  };

  const Component: FC = function () {
    return (
      <Father>
        <Chil />
      </Father>
    );
  };

  app = render(<Component />);
});

test('挂载组件后显示内容为0', async function () {
  const { findByTestId } = app;

  const countText = await findByTestId('count');

  expect(countText.innerHTML).toBe('0');
});

test(`默认挂载显示0
      点击inc后内容为1 effect触发一次
      点击add后不触发effect 内容为1`, async function () {
  const { findByTestId } = app;

  const incButton = await findByTestId('inc');
  const addButton = await findByTestId('add');
  const countText = await findByTestId('count');

  expect(countText.innerHTML).toBe('0');

  fireEvent.click(incButton);
  expect(countText.innerHTML).toBe('1');
  expect(fn).toHaveBeenCalledTimes(2);

  fireEvent.click(addButton);
  expect(countText.innerHTML).toBe('1');
  expect(fn).toHaveBeenCalledTimes(2);
});
