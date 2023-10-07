import { BASE_URL } from '.';
import { useFetchClient, useLocalStore } from '../hooks';

export function useAuth() {
  const authenticate = ({ username, password }: TAuthParams) => {
    const [auth, setAuth] = useLocalStore<TAuthHeaders>('auth', {});
    const { onPost, useDefaultHeaders } = useFetchClient();
    // onPost<TAuthParams>(
    //   `${BASE_URL}/auth`,
    //   {
    //     headers: useDefaultHeaders({
    //       authContent: { bearer: auth.bearer as string },
    //     }),
    //     credentials: 'include',
    //   },
    //   { username, password },
    fetch(`${BASE_URL}/auth`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        const { accessToken: bearer, userId: user } = await res.json();
        setAuth({ bearer, user });
      })
      .catch((err) => console.error(err));
  };

  const isAuth = () => {
    const [auth, _] = useLocalStore<TAuthHeaders>('auth', {});
    return auth.bearer || auth.user ? true : false;
  };

  return { authenticate, isAuth };
}
