import { Modal, Button, Input } from '../components';
import { TVerifySecretCodePopup } from '../types';

export function VerifySecretCodePopup({
  open,
  onClose,
  onBackdropClick,
}: TVerifySecretCodePopup) {
  const verify = () => {};

  return (
    <Modal
      open={() => open()}
      className='bg-bnt-light dark:bg-bnt-dark'
      label='Verify yourself first'
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      bodyClass='pb-10 w-[400px]'
    >
      <div class='grid grid-cols-1 place-items-start gap-3'>
        <span>
          <p>Please enter the secret code to be authorized.</p>
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
            label='Verify'
            title='Verify secret code'
            fill='bg-primary'
            hoverFill='hover:bg-secondary'
            onClick={verify}
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
