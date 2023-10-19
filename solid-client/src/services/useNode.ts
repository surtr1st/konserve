import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useNode() {
  const { onGet, onPost, onPut, onDelete } = useFetchClient(
    `${BASE_URL}/nodes`,
  );

  const retrieveNodes = async (): Promise<Nod3[]> => {
    const token = sessionStorage.getItem('AccessToken');
    const res = await onGet('', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  };

  const createNode = ({ name, uid }: TNodeParams) => {
    const token = sessionStorage.getItem('AccessToken');
    onPost(
      '',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      },
      { name, uid },
    )
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const updateNode = (id: number, name: string) => {
    const token = sessionStorage.getItem('AccessToken');
    onPut(
      `/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      },
      { name },
    )
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const deleteNode = (id: number) => {
    const token = sessionStorage.getItem('AccessToken');
    onDelete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.ok)
      .catch((err) => err);
  };

  return { retrieveNodes, createNode, updateNode, deleteNode };
}
