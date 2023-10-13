import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useUser() {
  const retrieveUsers = () => {
    const { onGet, useDefaultHeaders } = useFetchClient();
    onGet(`${BASE_URL}/users`, {
      headers: useDefaultHeaders({}),
    })
      .then(async (res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const createUser = (user: Partial<TUserParams>) => {
    const { onPost, useDefaultHeaders } = useFetchClient();
    onPost<Partial<TUserParams>>(
      `${BASE_URL}/user/register`,
      {
        headers: useDefaultHeaders({}),
      },
      user,
    )
      .then(async (res) => {
        const { message } = await res.json();
        if (res.status != 201) throw new Error(message);
      })
      .catch((err) => console.error(err));
  };

  return { retrieveUsers, createUser };
}
