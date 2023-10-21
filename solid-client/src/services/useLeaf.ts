import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useLeaf() {
  const { onGet, onPost, onPut, onDelete, useCredentials } = useFetchClient(
    `${BASE_URL}/leaves`,
  );

  const retrieveLeaves = async (): Promise<Leaf[]> => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onGet('', useCredentials(token, 'include'));
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  };

  const createLeaf = async (leaf: TLeafParams) => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onPost<TLeafParams>(
      '',
      useCredentials(token, 'include'),
      leaf,
    );
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  const updateLeaf = async (id: number, data: Omit<TLeafParams, 'nodeId'>) => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onPut(`/${id}`, useCredentials(token, 'include'), data);
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  const deleteLeaf = async (id: number) => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onDelete(`/${id}`, useCredentials(token, 'include'));
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  return { retrieveLeaves, createLeaf, updateLeaf, deleteLeaf };
}
