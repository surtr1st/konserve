import { Match, Switch } from 'solid-js';
import { Button, Input, Modal } from '../components';
import { TNodeActionPopup } from '../types';

export function NodeActionPopup({
  open,
  onClose,
  onBackdropClick,
  onAction,
  type = 'create',
}: TNodeActionPopup) {
  return (
    <Modal
      open={() => open()}
      className='bg-bnt-light dark:bg-bnt-dark'
      label='Node Creator'
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      bodyClass='pb-10 w-[400px]'
    >
      <div class='grid grid-cols-1 place-items-center gap-3'>
        <Input
          type='text'
          name='node-name'
          label='Name'
          textSize='text-md'
        />
        <Switch>
          <Match when={type === 'create'}>
            <Button
              textSize='text-md'
              label='Create'
              title='Create Node'
              fill='bg-primary'
              hoverFill='hover:bg-secondary'
              minWidth='min-w-lg'
              maxWidth='max-w-xl'
              minHeight='min-h-md'
              maxHeight='max-h-2xl'
              onClick={onAction}
            />
          </Match>
          <Match when={type === 'update'}>
            <Button
              textSize='text-md'
              label='Update'
              title='Update Node Name'
              fill='bg-primary'
              hoverFill='hover:bg-secondary'
              minWidth='min-w-lg'
              maxWidth='max-w-xl'
              minHeight='min-h-md'
              maxHeight='max-h-2xl'
              onClick={onAction}
            />
          </Match>
        </Switch>
      </div>
    </Modal>
  );
}
