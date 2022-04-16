import useClipboard from '../src/useClipboard';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import React, { FC, useState } from 'react';
import { act } from 'react-test-renderer';
let clipText: string = '';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText(text: string | number) {
      clipText = text.toString();
      return Promise.resolve(text);
    },
    readText() {
      return Promise.resolve(clipText);
    },
  },
});

describe('useClipboard', function () {
  beforeEach(() => (clipText = ''));

  test('测试正常复制信息', async function () {
    const { result } = renderHook(() => useClipboard());

    const {
      current: [, { copyToClipboard, getClipboard }],
    } = result;

    await copyToClipboard('test');

    const data = await getClipboard();

    expect(data).toBe('test');
  });

  test('测试通过dom复制信息正常', async function () {
    const App: FC = function () {
      const [ref, { copyToClipboard, getClipboard }] = useClipboard();
      const [clipboard, setClipboard] = useState('');

      async function setNewClipboard() {
        const data = await getClipboard();

        setClipboard(data);
      }

      return (
        <>
          <p data-testid='clipboard_data'>{clipboard}</p>
          <input ref={ref} data-testid='input_dom' />
          <button data-testid='copy_dom' onClick={() => copyToClipboard()}>
            copyDom
          </button>
          <button data-testid='copy' onClick={() => copyToClipboard('test-arg')}>
            copy
          </button>
          <button data-testid='set_clipboard' onClick={setNewClipboard}>
            set
          </button>
        </>
      );
    };

    const { findByTestId } = render(<App />);

    const copyDom = await findByTestId('copy_dom');
    const copyBtn = await findByTestId('copy');
    const setBtn = await findByTestId('set_clipboard');
    const input = await findByTestId('input_dom');

    act(function () {
      fireEvent.click(setBtn);
    });

    let clipData = await findByTestId('clipboard_data');
    const text = clipData.innerHTML;

    expect(text).toBe('');

    await act(async function () {
      fireEvent.input(input, { target: { value: 'test_demo' } });
      fireEvent.click(copyDom);
      fireEvent.click(setBtn);
    });

    clipData = await findByTestId('clipboard_data');
    const text2 = clipData.innerHTML;
    expect(text2).toBe('test_demo');

    await act(async function () {
      fireEvent.click(copyBtn);
      fireEvent.click(setBtn);
    });

    clipData = await findByTestId('clipboard_data');
    const text3 = clipData.innerHTML;
    expect(text3).toBe('test-arg');

    await act(async function () {
      fireEvent.input(input, { target: { value: 'input_clipbard' } });
      fireEvent.click(copyDom);
      fireEvent.click(setBtn);
    });

    clipData = await findByTestId('clipboard_data');
    const text4 = clipData.innerHTML;
    expect(text4).toBe('input_clipbard');
  });
});
