import clsx from 'clsx';
import { usePreferredTheme } from '../hooks';
import { For, createSignal, Match, Switch } from 'solid-js';
import { Button, Node, NodeCreator, Section } from '../components';
import { GearFillIcon } from '../components/icons/GearFillIcon';
import {
  CloudSun2BoldDuoTone,
  CloudyMoonBoldDuoTone,
} from '../components/icons';

export function Main() {
  const { isDarkMode, toggleTheme } = usePreferredTheme();
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
      <Section type='toolbar'>
        <Button
          minWidth='min-w-md'
          maxWidth='max-w-md'
          minHeight='min-h-lg'
          maxHeight='max-h-lg'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          color='text-fnt-light'
          onClick={toggleTheme}
          icon={
            <Switch>
              <Match when={isDarkMode()}>
                <CloudSun2BoldDuoTone />
              </Match>
              <Match when={!isDarkMode()}>
                <CloudyMoonBoldDuoTone />
              </Match>
            </Switch>
          }
        />
        <Button
          minWidth='min-w-md'
          maxWidth='max-w-md'
          minHeight='min-h-lg'
          maxHeight='max-h-lg'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          color='text-fnt-light'
          icon={<GearFillIcon />}
        />
      </Section>
      <section class='grid place-items-center w-[1600px] h-[90vh]'>
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
