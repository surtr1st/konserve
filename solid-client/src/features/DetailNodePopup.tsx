import { Modal } from '../components';
import { Node, NodeCreator } from '.';
import { For, createSignal } from 'solid-js';

export function DetailNodePopup() {
  const [nodes, _] = createSignal([
    { id: 1, name: 'Keyboard Cat' },
    { id: 2, name: 'Maru' },
    { id: 3, name: 'Henri The Existential Cat' },
  ]);
  return (
    <Modal open={() => true}>
      <div class='grid grid-cols-1'>
        <For each={nodes()}>{() => <Node />}</For>
        <NodeCreator />
      </div>
    </Modal>
  );
}
