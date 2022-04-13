import { useCallback, useMemo, useState } from 'react';

type EyeDropper = {
  open: (options?: { signal?: AbortSignal }) => Promise<{ sRGBHex: string | undefined }>;
};

/**
 * 屏幕取色器，可以获取当前屏幕上选中区域的颜色
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API
 *
 * @example
 *
 * const [{color}, open] = useEyeDropper();
 *
 * const handleClick = useCallback(() => {
 *  open();
 * }, [open]);
 *
 *
 */
function useEyeDropper(
  init?: string,
): [
  state: { canUse: boolean; color: string },
  action: (signal?: AbortSignal | undefined) => Promise<string | undefined>,
] {
  const canUse = useMemo(function () {
    return Object.prototype.hasOwnProperty.call(window, 'EyeDropper');
  }, []);
  const [color, setColor] = useState(init ?? '');

  const open = useCallback(
    async function (signal?: AbortSignal) {
      if (!canUse) return;

      const eyeDropper: EyeDropper = new (window as any).EyeDropper();

      const res = await eyeDropper.open({ signal });
      res.sRGBHex && setColor(res.sRGBHex);

      return res.sRGBHex;
    },
    [canUse],
  );

  return [{ canUse, color }, open];
}

export default useEyeDropper;
