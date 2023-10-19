import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useUser() {
  const { onPost } = useFetchClient(`${BASE_URL}/users`);

  const createUser = (user: Partial<TUserParams>) => {
    onPost<Partial<TUserParams>>('/register', {}, user)
      .then((res) => res.ok)
      .catch((err) => err);
  };

  return { createUser };
}
