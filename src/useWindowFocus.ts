import { useLayoutEffect, useState } from 'react';

/**
 * 监听当前窗口是否获取焦点
 *
 * @example
 *
 * const isFocused = useWindowFocus();
 *
 * useEffect(function(){
 *  document.title = isFocused ? 'Focused' : 'Not Focused';
 * }, [isFocused]);
 *
 */
function useWindowFocus() {
  const [state, setState] = useState(function () {
    return document.hasFocus();
  });

  useLayoutEffect(function () {
    function handleFocus() {
      setState(true);
    }

    function handleBlur() {
      setState(false);
    }

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return function () {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return state;
}

export default useWindowFocus;
