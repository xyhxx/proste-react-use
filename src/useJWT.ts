import decode from 'jwt-decode';
import { useState } from 'react';
import useUpdatedLayoutEffect from './useUpdatedLayoutEffect';

/**
 * 解码JWT
 *
 * @example
 *
 * const result = useJWT('xxxx', false);
 */
function useJWT<T = unknown>(source: string, header?: boolean) {
  const [jwt, setJWT] = useState<T>(function () {
    return decode<T>(source, { header });
  });

  useUpdatedLayoutEffect(
    function () {
      setJWT(decode<T>(source, { header }));
    },
    [source, header],
  );

  return jwt;
}

export default useJWT;
