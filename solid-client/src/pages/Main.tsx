import clsx from 'clsx';
import { useDynamicGridColumns, usePreferredTheme } from '../hooks';
import { For, createSignal, Match, Switch } from 'solid-js';
import { Button, Section } from '../components';
import { Node, NodeCreator } from '../features';
import { GearFillIcon } from '../components/icons/GearFillIcon';
import { useNavigate } from '@solidjs/router';
import {
  CloudSun2BoldDuoTone,
  CloudyMoonBoldDuoTone,
} from '../components/icons';

export function Main() {
  const { isDarkMode, toggleTheme } = usePreferredTheme();
  const navigate = useNavigate();
  const [nodes, _] = createSignal([
    { id: 1, name: 'Keyboard Cat' },
    { id: 2, name: 'Maru' },
    { id: 3, name: 'Henri The Existential Cat' },
  ]);
  const expandColumns = useDynamicGridColumns(nodes().length + 1);

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
          onClick={() => navigate('/preferences')}
        />
      </Section>
      <Section type='body'>
        <div
          class={clsx(
            'grid',
            nodes().length >= 5 && 'grid-cols-5',
            nodes().length < 5 && expandColumns,
          )}
        >
          <NodeCreator />
          <For each={nodes()}>{() => <Node />}</For>
        </div>
      </Section>
    </main>
  );
}
