import { BASE_URL } from '.';
import { useFetchClient, useLocalStore } from '../hooks';

export function useAuth() {
  const authenticate = ({ username, password }: TAuthParams) => {
    const [_, setAuth] = useLocalStore<TUserId>('auth', {});
    const { onPost } = useFetchClient(BASE_URL);
    onPost<TAuthParams>('/auth', {}, { username, password })
      .then(async (res) => {
        const userId = parseInt(await res.text());
        setAuth({ userId });
      })
      .catch((err) => err);
  };

  const isAuth = () => {
    const [auth, _] = useLocalStore<TUserId>('auth', {});
    return auth.userId ? true : false;
  };

  return { authenticate, isAuth };
}
