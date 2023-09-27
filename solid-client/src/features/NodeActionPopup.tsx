import { Button, Input, Modal } from '../components';
import { TNodeActionPopup } from '../types';

export function NodeActionPopup({
  open,
  onClose,
  onAdd,
  onBackdropClick,
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
          onClick={onAdd}
        />
      </div>
    </Modal>
  );
}
