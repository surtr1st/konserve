import test from '../assets/test-tube-bold.png';
import clsx from 'clsx';
import { Button } from '../components';
import { TNode } from '../types';
import { DeleteFilledIcon, EyeIcon } from '../components/icons';
import { Match, Switch } from 'solid-js';

export function Node({
  src,
  onView,
  onViewDetail,
  onDelete,
  className,
}: Partial<TNode>) {
  const baseSizeClass = 'w-72 h-72';
  const baseClass =
    'relative m-2 rounded-lg border border-primary bg-white hover:bg-bnt-white-1 dark:bg-bnt-dark dark:hover:bg-bnt-dark-1 cursor-pointer transition-all';
  const clsxName = clsx(baseClass, className ? className : baseSizeClass);
  return (
    <div
      title='View'
      class={clsxName}
    >
      <div
        class='grid place-items-center h-full'
        onclick={onView}
      >
        <Switch>
          <Match when={!src}>
            <img src={test} />
          </Match>
        </Switch>
      </div>
      <div class='absolute top-0 right-0 z-10 flex flex-col m-2'>
        <Button
          title='View detail'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          className='h-10 w-10'
          icon={<EyeIcon />}
          onClick={onViewDetail}
        />
        <Button
          title='Delete Node'
          fill='bg-danger'
          hoverFill='hover:bg-b-disabled'
          className='h-10 w-10'
          icon={<DeleteFilledIcon />}
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
