import { useLocalStore } from '../hooks';

const BASE_URL = 'http://localhost:3000/api';

type TAuthParams = {
  username: string;
  password: string;
};

export function useAuth() {
  const authenticate = ({ username, password }: TAuthParams) => {
    const [auth, setAuth] = useLocalStore<
      Omit<Partial<TAuthContent>, 'secret'>
    >('id', {});
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

  return { authenticate };
}
