import { Modal } from '../components';
import { Leaf, LeafCreator } from '.';
import { For } from 'solid-js';
import { TDetailNodePopup } from '../types';

export function DetailNodePopup({
  open,
  onClose,
  onBackdropClick,
  data,
}: TDetailNodePopup) {
  return (
    <Modal
      open={() => open()}
      className='bg-bnt-light dark:bg-bnt-dark'
      label='Detail Account Node'
      onClose={onClose}
      onBackdropClick={onBackdropClick}
    >
      <div class='grid grid-cols-1'>
        <For each={data}>
          {(account) => (
            <Leaf
              type='minimal'
              username={account.username}
              password={account.password}
            />
          )}
        </For>
        <LeafCreator />
      </div>
    </Modal>
  );
}
