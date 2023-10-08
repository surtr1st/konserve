import { BASE_URL } from '.';
import { useFetchClient, useLocalStore } from '../hooks';

export function useAuth() {
  const authenticate = ({ username, password }: TAuthParams) => {
    const [auth, setAuth] = useLocalStore<TAuthHeaders>('auth', {});
    const { onPost } = useFetchClient();
    onPost<TAuthParams>(
      `${BASE_URL}/auth`,
      {
        headers: {
          Authorization: `Bearer ${auth.bearer}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
      { username, password },
    )
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
