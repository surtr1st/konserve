import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useAuth() {
  const { onGet, onPost } = useFetchClient(BASE_URL);
  const authenticate = async ({ username, password }: TAuthParams) => {
    const res = await onPost<TAuthParams>('/auth', {}, { username, password });

    if (res.status >= 400) throw new Error(await res.text());

    const json = (await res.json()) as TAuthHeaders;
    sessionStorage.setItem('UserID', json.user as string);
    sessionStorage.setItem('AccessToken', json.bearer as string);

    return res.status;
  };

  const isAuthorized = async () => {
    const accessToken = sessionStorage.getItem('AccessToken');
    const res = await onGet(`/auth/verify?token=${accessToken}`);
    return res.status < 400 ? true : false;
  };

  return { authenticate, isAuthorized };
}
