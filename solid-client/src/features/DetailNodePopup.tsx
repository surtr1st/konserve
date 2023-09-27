import { Modal } from '../components';
import { Leaf, LeafCreator, LeafActionPopup } from '.';
import { For, createSignal } from 'solid-js';
import { TDetailNodePopup } from '../types';

export function DetailNodePopup({
  open,
  onClose,
  onBackdropClick,
  data,
}: TDetailNodePopup) {
  const [showPopup, setShowPopup] = createSignal(false);

  const openCreator = () => {
    setShowPopup((open) => !open);
  };

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
        <LeafCreator onAdd={openCreator} />
        <LeafActionPopup
          open={() => showPopup()}
          onClose={openCreator}
          onBackdropClick={openCreator}
          onAction={() => {}}
        />
      </div>
    </Modal>
  );
}
