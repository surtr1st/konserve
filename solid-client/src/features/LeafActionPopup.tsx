import { Match, Show, Switch } from 'solid-js';
import { Modal, Input, Button } from '../components';
import { TLeafActionPopup } from '../types';

export function LeafActionPopup({
  open,
  onClose,
  onBackdropClick,
  type = 'create',
}: TLeafActionPopup) {
  const onCreate = () => {};
  const onUpdate = () => {};

  return (
    <Modal
      open={() => open()}
      className='bg-bnt-light dark:bg-bnt-dark z-50'
      label='Leaf Creator'
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      bodyClass='pb-10 w-[400px]'
      zIndex='z-[70]'
      backdropZIndex='z-[60]'
    >
      <div class='grid grid-cols-1 place-items-center gap-3'>
        <Input
          type='text'
          name='username'
          label='Username/Email'
          textSize='text-md'
        />
        <Input
          type='password'
          name='password'
          label='Password'
          textSize='text-md'
        />
        <Show when={type === 'update'}>
          <Input
            type='password'
            name='confirm-password'
            label='Confirm Password'
            textSize='text-md'
          />
        </Show>
        <div class='flex justify-center items-center gap-x-3'>
          <Switch>
            <Match when={type === 'create'}>
              <Button
                textSize='text-md'
                label='Add'
                title='Add account'
                fill='bg-primary'
                hoverFill='hover:bg-secondary'
                minWidth='min-w-lg'
                maxWidth='max-w-xl'
                minHeight='min-h-md'
                maxHeight='max-h-2xl'
                onClick={onCreate}
              />
            </Match>
            <Match when={type === 'update'}>
              <Button
                textSize='text-md'
                label='Update'
                title='Update account'
                fill='bg-primary'
                hoverFill='hover:bg-secondary'
                minWidth='min-w-lg'
                maxWidth='max-w-xl'
                minHeight='min-h-md'
                maxHeight='max-h-2xl'
                onClick={onUpdate}
              />
            </Match>
          </Switch>
          <Button
            textSize='text-md'
            label='Cancel'
            fill='bg-b-disabled'
            hoverFill='hover:bg-bnt-dark-1'
            minWidth='min-w-lg'
            maxWidth='max-w-xl'
            minHeight='min-h-md'
            maxHeight='max-h-2xl'
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
