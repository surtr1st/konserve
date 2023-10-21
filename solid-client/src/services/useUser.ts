import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useUser() {
  const { onGet, onPost, useCredentials } = useFetchClient(`${BASE_URL}/users`);

  const createUser = async (user: Partial<TUserParams>) => {
    const res = await onPost<Partial<TUserParams>>('/register', {}, user);
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  const isEmailExisted = async (email: string) => {
    const token = localStorage.getItem('AccessToken') as string;
    const res = await onGet(
      `/exist?email=${email}`,
      useCredentials(token, 'include'),
    );
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  const isUsernameExisted = async (username: string) => {
    const token = localStorage.getItem('AccessToken') as string;
    const res = await onGet(
      `/exist?username=${username}`,
      useCredentials(token, 'include'),
    );
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  return { createUser, isEmailExisted, isUsernameExisted };
}
