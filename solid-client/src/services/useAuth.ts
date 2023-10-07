import { useLocalStore } from '../hooks';

const BASE_URL = 'http://localhost:3000/api';

type TAuthParams = {
  username: string;
  password: string;
};

export function useAuth() {
  const authenticate = ({ username, password }: TAuthParams) => {
    const [auth, setAuth] = useLocalStore<TAuthHeaders>('auth', {});
    fetch(`${BASE_URL}/auth`, {
      headers: {
        Authorization: `Bearer ${auth.bearer}`,
        'Content-Type': 'application/json',
      },
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
