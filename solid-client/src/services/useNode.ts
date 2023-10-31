import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useNode() {
  const { onGet, onPost, onPut, onDelete, useCredentials } = useFetchClient(
    `${BASE_URL}/nodes`,
  );

  const retrieveNodes = async (): Promise<Nod3[]> => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const userId = sessionStorage.getItem('UserID');
    const res = await onGet(
      `?userId=${userId}`,
      useCredentials(token, 'include'),
    );
    if (res.status >= 400) throw new Error(await res.text());
    return await res.json();
  };

  const createNode = async (node: TNodeParams) => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onPost<TNodeParams>(
      '',
      useCredentials(token, 'include'),
      node,
    );
    if (res.status !== 201) throw new Error(await res.text());
    return res.ok;
  };

  const updateNode = async (id: number, name: string) => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onPut(`/${id}`, useCredentials(token, 'include'), {
      name,
    });
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  const deleteNode = async (id: number) => {
    const token = sessionStorage.getItem('AccessToken') as string;
    const res = await onDelete(`/${id}`, useCredentials(token, 'include'));
    if (res.status >= 400) throw new Error(await res.text());
    return res.ok;
  };

  return { retrieveNodes, createNode, updateNode, deleteNode };
}
