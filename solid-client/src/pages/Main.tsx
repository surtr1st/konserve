import { For, createSignal } from 'solid-js';
import { Node, NodeCreator } from '../components';
import clsx from 'clsx';

export function Main() {
  const [nodes, _] = createSignal([
    { id: 1, name: 'Keyboard Cat' },
    { id: 2, name: 'Maru' },
    { id: 3, name: 'Henri The Existential Cat' },
  ]);

  const expandColumns = () => {
    switch (nodes().length) {
      case 0:
        return 'grid-cols-1';
      case 1:
        return 'grid-cols-2';
      case 2:
        return 'grid-cols-3';
      case 3:
        return 'grid-cols-4';
      default:
        return '';
    }
  };

  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <section class='grid place-items-center w-[1600px]'>
        <div
          class={clsx(
            'grid',
            nodes().length >= 5 && 'grid-cols-5',
            nodes().length < 5 && expandColumns(),
          )}
        >
          <NodeCreator />
          <For each={nodes()}>{() => <Node />}</For>
        </div>
      </section>
    </main>
  );
}
