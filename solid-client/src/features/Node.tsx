import { Button } from '../components';
import { TNode } from '../types';
import { EyeIcon } from '../components/icons';

export function Node({ src, onView, onViewDetail }: Partial<TNode>) {
  return (
    <div
      title='View'
      class='relative w-72 h-72 m-2 rounded-lg border border-primary bg-white hover:bg-bnt-white-1 dark:bg-bnt-dark dark:hover:bg-bnt-dark-1 cursor-pointer transition-all'
    >
      <picture onclick={onView}>
        <source src={src} />
      </picture>
      <div class='absolute top-0 right-0 flex flex-col m-2'>
        <Button
          title='View detail'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          className='h-10 w-10'
          icon={<EyeIcon />}
          onClick={onViewDetail}
        />
      </div>
    </div>
  );
}
