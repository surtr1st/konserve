import { TLeafCreator } from '../types';
import { PlusIcon } from '../components/icons';

export function LeafCreator({ onAdd }: Partial<TLeafCreator>) {
  return (
    <div
      title='Add account'
      class='grid place-items-center  w-[500px] h-60 m-2 rounded-lg border-dashed border border-bnt-dark-2 bg-white hover:bg-bnt-white-1 dark:bg-bnt-dark dark:hover:bg-bnt-dark-1 cursor-pointer transition-all'
      onClick={onAdd}
    >
      <PlusIcon />
    </div>
  );
}
