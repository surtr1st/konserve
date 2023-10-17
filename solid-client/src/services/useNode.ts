import { BASE_URL } from '.';
import { useFetchClient } from '../hooks';

export function useNode() {
  const { onGet, onPost, onPut, onDelete } = useFetchClient(
    `${BASE_URL}/nodes`,
  );

  const retrieveNodes = () => {
    onGet('/', {})
      .then((res) => res.json())
      .catch((err) => err);
  };

  const createNode = ({ name, uid }: TNodeParams) => {
    onPost('/', {}, { name, uid })
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const updateNode = (id: number, name: string) => {
    onPut(`/${id}`, {}, { name })
      .then((res) => res.ok)
      .catch((err) => err);
  };

  const deleteNode = (id: number) => {
    onDelete(`/${id}`, {})
      .then((res) => res.ok)
      .catch((err) => err);
  };

  return { retrieveNodes, createNode, updateNode, deleteNode };
}