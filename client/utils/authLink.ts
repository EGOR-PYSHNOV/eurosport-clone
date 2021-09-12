import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';

export const authLink = setContext((_, prevCtx) => {
  let headers = prevCtx.headers || {};

  if (!headers['authorization']) {
    const cookies = parseCookies();
    const token = cookies?.token;

    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    };
  }

  return { headers };
});
