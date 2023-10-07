const BASE_URL = 'http://localhost:3000/api';

type TAuthParams = {
  username: string;
  password: string;
};

export function useAuth() {
  const authenticate = ({ username, password }: TAuthParams) => {
    const bearerToken = localStorage.getItem('token');
    fetch(`${BASE_URL}/auth`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        const { accessToken, userId } = await res.json();
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', userId);
      })
      .catch((err) => console.error(err));
  };

  return { authenticate };
}
