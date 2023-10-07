import clsx from 'clsx';
import { For, createSignal } from 'solid-js';
import { Section } from '../components';
import { useDynamicGridColumns } from '../hooks';
import { Leaf, LeafCreator } from '../features';

export function DetailNode() {
  const [nodes, _] = createSignal([
    { id: 1, name: 'Keyboard Cat' },
    { id: 2, name: 'Maru' },
    { id: 3, name: 'Henri The Existential Cat' },
  ]);
  const expandColumns = useDynamicGridColumns(nodes().length + 1);

  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <Section type='body'>
        <div
          class={clsx(
            'grid',
            nodes().length >= 3 && 'grid-cols-3',
            nodes().length < 3 && expandColumns,
          )}
        >
          <LeafCreator />
          <For each={nodes()}>{() => <Leaf />}</For>
        </div>
      </Section>
    </main>
  );
}
