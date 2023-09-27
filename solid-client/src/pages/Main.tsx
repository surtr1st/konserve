import clsx from 'clsx';
import { useDynamicGridColumns, usePreferredTheme } from '../hooks';
import { useNavigate } from '@solidjs/router';
import { For, createSignal, Match, Switch } from 'solid-js';
import { Button, Section } from '../components';
import {
  DeleteNodePopup,
  Node,
  NodeCreator,
  NodeActionPopup,
  VerifySecretCodePopup,
  DetailNodePopup,
} from '../features';
import {
  GearFillIcon,
  CloudSun2BoldDuoTone,
  CloudyMoonBoldDuoTone,
} from '../components/icons';

export function Main() {
  const { isDarkMode, toggleTheme } = usePreferredTheme();
  const navigate = useNavigate();
  const [showDetailPopup, setShowDetailPopup] = createSignal(false);
  const [showCreator, setShowCreator] = createSignal(false);
  const [showVerifyPopup, setShowVerifyPopup] = createSignal(false);
  const [showUpdatePopup, setShowUpdatePopup] = createSignal(false);
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);

  const [nodes, _] = createSignal([
    { id: 1, name: 'Keyboard Cat' },
    { id: 2, name: 'Maru' },
    { id: 3, name: 'Henri The Existential Cat' },
  ]);
  const [accounts, _set] = createSignal([
    { username: 'adudarwa', password: '123' },
    { username: 'adudarwa', password: '123' },
    { username: 'adudarwa', password: '123' },
    { username: 'adudarwa', password: '123' },
  ]);

  const expandColumns = useDynamicGridColumns(nodes().length + 1);
  const openDetailPopup = () => {
    setShowDetailPopup(!showDetailPopup());
  };
  const openVerifyPopup = () => {
    setShowVerifyPopup(!showVerifyPopup());
  };
  const openCreator = () => {
    setShowCreator(!showCreator());
  };
  const openUpdatePopup = () => {
    setShowUpdatePopup(!showUpdatePopup());
  };
  const openDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup());
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
          <NodeCreator onAdd={openCreator} />
          <NodeActionPopup
            open={() => showCreator()}
            onClose={openCreator}
            onBackdropClick={openCreator}
            onAction={() => {}}
          />
          <For each={nodes()}>
            {() => (
              <Node
                onView={openDetailPopup}
                onViewDetail={openVerifyPopup}
                onEdit={openUpdatePopup}
                onDelete={openDeletePopup}
              />
            )}
          </For>
          <VerifySecretCodePopup
            open={() => showVerifyPopup()}
            onClose={openVerifyPopup}
            onBackdropClick={openVerifyPopup}
          />
          <NodeActionPopup
            type='update'
            open={() => showUpdatePopup()}
            onClose={openUpdatePopup}
            onBackdropClick={openUpdatePopup}
            onAction={() => {}}
          />
          <DetailNodePopup
            open={() => showDetailPopup()}
            onClose={openDetailPopup}
            onBackdropClick={openDetailPopup}
            data={accounts()}
          />
          <DeleteNodePopup
            open={() => showDeletePopup()}
            onClose={openDeletePopup}
            onBackdropClick={openDeletePopup}
            onAccept={() => false}
          />
        </div>
      </Section>
    </main>
  );
}
