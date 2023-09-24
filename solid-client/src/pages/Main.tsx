import { For, createSignal } from 'solid-js';
import { Node, NodeCreator } from '../components';

export function Main() {
  const [nodes, _] = createSignal([
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' },
  ]);

  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <section class='grid place-items-center'>
        <div class='flex flex-wrap justify-evenly items-center'>
          <NodeCreator />
          <For each={nodes()}>{() => <Node />}</For>
        </div>
      </section>
    </main>
  );
}
