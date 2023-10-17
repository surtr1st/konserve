import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useLeaf() {
  const { onGet, onPost, onPut, onDelete } = useFetchClient(
    `${BASE_URL}/leaves`,
  );

  const retrieveLeaves = async (): Promise<Leaf> => {
    const res = await onGet('/', {});
    return await res.json();
  };

  const createLeaf = (leaf: TLeafParams) => {
    onPost('/', {}, leaf)
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const updateLeaf = (id: number, data: Omit<TLeafParams, 'nodeId'>) => {
    onPut(`/${id}`, {}, data)
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const deleteLeaf = (id: number) => {
    onDelete(`/${id}`, {})
      .then((res) => res.ok)
      .catch((err) => err);
  };

  return { retrieveLeaves, createLeaf, updateLeaf, deleteLeaf };
}
