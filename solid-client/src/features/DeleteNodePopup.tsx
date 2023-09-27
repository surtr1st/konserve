import { Modal, Input, Button } from '../components';
import { TDeleteNodePopup } from '../types';

export function DeleteNodePopup({
  open,
  onClose,
  onBackdropClick,
  onAccept,
}: TDeleteNodePopup) {
  return (
    <Modal
      open={() => open()}
      className='bg-bnt-light dark:bg-bnt-dark'
      label='Delete this node?'
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      bodyClass='pb-10 w-[400px]'
    >
      <div class='grid grid-cols-1 place-items-center gap-3'>
        <span>
          <p>Do you really want to delete this node?</p>
          <p>As your determination, please enter the secret code to proceed.</p>
        </span>
        <Input
          type='text'
          name='node-name'
          label='Secret Code'
          textSize='text-md'
        />
        <div class='flex justify-center items-center gap-x-3'>
          <Button
            textSize='text-md'
            label="Yes, I've decided!"
            title='Delete Node'
            fill='bg-danger'
            hoverFill='hover:bg-secondary'
            onClick={onAccept}
            className='min-w-[150px] min-h-md'
          />
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
