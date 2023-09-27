import { Button, Input, Modal } from '../components';
import { TNodeCreatorPopup } from '../types';

export function NodeCreatorPopup({
  open,
  onClose,
  onAction,
  onBackdropClick,
}: TNodeCreatorPopup) {
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
      </div>
    </Modal>
  );
}
