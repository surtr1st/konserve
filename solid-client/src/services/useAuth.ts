import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useAuth() {
  const { onGet, onPost } = useFetchClient(BASE_URL);
  const authenticate = async ({ username, password }: TAuthParams) => {
    try {
      const res = await onPost<TAuthParams>(
        '/auth',
        {},
        { username, password },
      );
      if (res.status === 404) throw new Error(await res.text());
      const json = (await res.json()) as TAuthHeaders;
      sessionStorage.setItem('UserID', json.user as string);
      sessionStorage.setItem('AccessToken', json.bearer as string);
    } catch (e) {
      console.error(e);
    }
  };

  const isAuth = async () => {
    const accessToken = sessionStorage.getItem('AccessToken');
    const res = await onGet(`/auth/verify?token=${accessToken}`);
    return res.status < 400 ? true : false;
  };

  return { authenticate, isAuth };
}
