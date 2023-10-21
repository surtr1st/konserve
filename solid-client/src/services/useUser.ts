import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useUser() {
  const { onPost } = useFetchClient(`${BASE_URL}/users`);

  const createUser = async (user: Partial<TUserParams>) => {
    const res = await onPost<Partial<TUserParams>>('/register', {}, user);
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  return { createUser };
}
