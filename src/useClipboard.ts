/*
 * @Description: 获取和复制粘贴板hook
 * @FilePath: /proste-react-use/src/useClipboard.ts
 */
import { useCallback, useRef } from 'react';

/**
 * 复制和获取粘贴板hook
 *
 * @example
 *
 * const [ref, {copyToClipboard, getClipboard}] = useClipboard();
 *
 * <input ref={ref} data-copy="test" />
 *
 * copyToClipboard();
 *
 */

function useClipboard() {
  const ref = useRef(null);

  const copyToClipboard = useCallback(function (text?: string | number | null) {
    return new Promise<string | number>(function (res, rej) {
      try {
        let copyText = text;

        if (!copyText) {
          copyText = (ref.current as unknown as HTMLInputElement)?.value;
        }

        if (!copyText) {
          const error = 'The copied content cannot be empty';
          rej(error);
          return;
        }

        if (typeof copyText !== 'string' && typeof copyText !== 'number') {
          const error = 'The copied content must be a string or a number';
          rej(error);
          return;
        }

        navigator.clipboard
          .writeText(copyText.toString())
          .then(function () {
            res(copyText as string | number);
          })
          .catch(function (err) {
            rej(err);
          });
      } catch (error) {
        rej(error);
      }
    });
  }, []);

  const getClipboard = useCallback(function () {
    return navigator.clipboard.readText();
  }, []);

  return [ref, { copyToClipboard, getClipboard }] as const;
}

export default useClipboard;
