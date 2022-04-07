import { renderHook } from '@testing-library/react-hooks';
import useJWT from '../src/useJWT';

test('测试解码jwt是否正确', function () {
  const { result } = renderHook(function () {
    return useJWT(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    );
  });

  expect(result.current).toEqual({
    sub: '1234567890',
    name: 'John Doe',
    iat: 1516239022,
  });
});

test('测试解码jwt是否正确,head为true', function () {
  const { result } = renderHook(function () {
    return useJWT(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      true,
    );
  });

  expect(result.current).toEqual({
    alg: 'HS256',
    typ: 'JWT',
  });
});
