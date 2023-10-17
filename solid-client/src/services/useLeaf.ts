import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useLeaf() {
  const { onGet, onPost, onPut, onDelete } = useFetchClient(
    `${BASE_URL}/leaves`,
  );

  const retrieveLeaves = async (): Promise<Leaf[]> => {
    const token = sessionStorage.getItem('AccessToken');
    const res = await onGet('', {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  };

  const createLeaf = (leaf: TLeafParams) => {
    const token = sessionStorage.getItem('AccessToken');
    onPost(
      '',
      {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      },
      leaf,
    )
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const updateLeaf = (id: number, data: Omit<TLeafParams, 'nodeId'>) => {
    const token = sessionStorage.getItem('AccessToken');
    onPut(
      `/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      },
      data,
    )
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const deleteLeaf = (id: number) => {
    const token = sessionStorage.getItem('AccessToken');
    onDelete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then((res) => res.ok)
      .catch((err) => err);
  };

  return { retrieveLeaves, createLeaf, updateLeaf, deleteLeaf };
}
