import clsx from 'clsx';
import { useAuth, useLeaf, useNode } from '../services';
import {
  useDynamicGridColumns,
  useLocalStore,
  usePreferredTheme,
} from '../hooks';
import { useNavigate } from '@solidjs/router';
import {
  For,
  createSignal,
  Match,
  Switch,
  createEffect,
  createResource,
} from 'solid-js';
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
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = usePreferredTheme();
  const { isAuthorized } = useAuth();
  const { retrieveNodes } = useNode();
  const { retrieveLeaves } = useLeaf();

  const [nodes] = createResource<Nod3[]>(retrieveNodes);
  const [leaves] = createResource<Leaf[]>(retrieveLeaves);
  const [_, setStore] = useLocalStore('Store', { nodeId: 0 });

  const [showDetailPopup, setShowDetailPopup] = createSignal(false);
  const [showCreator, setShowCreator] = createSignal(false);
  const [showVerifyPopup, setShowVerifyPopup] = createSignal(false);
  const [showUpdatePopup, setShowUpdatePopup] = createSignal(false);
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [node, setNode] = createSignal<Partial<Nod3>>({});

  const expandColumns = useDynamicGridColumns(nodes.length + 1);
  const openDetailPopup = (nodeId?: number) => {
    setShowDetailPopup(!showDetailPopup());
    setStore({ nodeId });
  };
  const openVerifyPopup = (nodeId?: number) => {
    setShowVerifyPopup(!showVerifyPopup());
    setStore({ nodeId });
  };
  const openCreator = () => {
    setShowCreator(!showCreator());
  };
  const openUpdatePopup = (nodeId?: number) => {
    setShowUpdatePopup(!showUpdatePopup());
    const node = nodes()?.find((node) => node.id === nodeId);
    setNode({ ...node });
    setStore({ nodeId });
  };
  const openDeletePopup = (nodeId?: number) => {
    setShowDeletePopup(!showDeletePopup());
    setStore({ nodeId });
  };

  createEffect(async () => {
    const navigate = useNavigate();

    const authorized = await isAuthorized();
    if (!authorized) {
      navigate('/login', { replace: true });
      return;
    }
  });

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
            nodes.length >= 5 && 'grid-cols-5',
            nodes.length < 5 && expandColumns,
          )}
        >
          <NodeCreator onAdd={openCreator} />
          <NodeActionPopup
            open={() => showCreator()}
            onClose={openCreator}
            onBackdropClick={openCreator}
          />
          <For each={nodes()}>
            {(node) => (
              <Node
                onView={() => openDetailPopup(node.id)}
                onViewDetail={() => openVerifyPopup(node.id)}
                onEdit={() => openUpdatePopup(node.id)}
                onDelete={() => openDeletePopup(node.id)}
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
            placeholder={node().name}
          />
          <DetailNodePopup
            open={() => showDetailPopup()}
            onClose={openDetailPopup}
            onBackdropClick={openDetailPopup}
            data={leaves() as Leaf[]}
          />
          <DeleteNodePopup
            open={() => showDeletePopup()}
            onClose={openDeletePopup}
            onBackdropClick={openDeletePopup}
          />
        </div>
      </Section>
    </main>
  );
}
