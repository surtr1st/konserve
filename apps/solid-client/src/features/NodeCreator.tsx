import { TNodeCreator } from '../types';
import { PlusIcon } from '../components/icons';

export function NodeCreator({ onAdd }: Partial<TNodeCreator>) {
  return (
    <div
      onclick={onAdd}
      class='grid place-items-center w-72 h-72 m-2 rounded-lg border-dashed border border-bnt-dark-2 bg-white hover:bg-bnt-white-1 dark:bg-bnt-dark dark:hover:bg-bnt-dark-1 cursor-pointer transition-all'
    >
      <PlusIcon />
    </div>
  );
}
