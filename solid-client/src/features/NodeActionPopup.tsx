import { Match, Switch } from 'solid-js';
import { Button, Input, Modal } from '../components';
import { TNodeActionPopup } from '../types';
import { useNode } from '../services';
import { useLocalStore, useSolidToast } from '../hooks';

export function NodeActionPopup({
  open,
  onClose,
  onBackdropClick,
  type = 'create',
}: TNodeActionPopup) {
  let nodeName: SolidInputRef;

  const { onSuccess, onError } = useSolidToast();
  const { createNode, updateNode } = useNode();
  const [store, _] = useLocalStore('Store', { nodeId: 0 });

  const onCreate = () => {
    const userId = parseInt(sessionStorage.getItem('UserID') as string);
    const unwrapNodeName = (nodeName as HTMLInputElement).value;
    createNode({ uid: userId, name: unwrapNodeName })
      .then((ok) => ok && onSuccess('Added new node!'))
      .catch((err: ResponseError) => onError(err.message));
  };

  const onUpdate = () => {
    const unwrapNodeName = (nodeName as HTMLInputElement).value;
    updateNode(store.nodeId, unwrapNodeName)
      .then((ok) => ok && onSuccess('Updated new node!'))
      .catch((err: ResponseError) => onError(err.message));
  };

  return (
    <Modal
      open={() => open()}
      className='bg-bnt-light dark:bg-bnt-dark'
      label={type === 'create' ? 'Node Creator' : 'Update Node'}
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      bodyClass='pb-10 w-[400px]'
    >
      <div class='grid grid-cols-1 place-items-center gap-3'>
        <Input
          type='text'
          name='node-name'
          label='Name'
          textSize='text-md'
          ref={nodeName}
        />
        <Switch>
          <Match when={type === 'create'}>
            <Button
              textSize='text-md'
              label='Create'
              title='Create Node'
              fill='bg-primary'
              hoverFill='hover:bg-secondary'
              minWidth='min-w-lg'
              maxWidth='max-w-xl'
              minHeight='min-h-md'
              maxHeight='max-h-2xl'
              onClick={onCreate}
            />
          </Match>
          <Match when={type === 'update'}>
            <Button
              textSize='text-md'
              label='Update'
              title='Update Node Name'
              fill='bg-primary'
              hoverFill='hover:bg-secondary'
              minWidth='min-w-lg'
              maxWidth='max-w-xl'
              minHeight='min-h-md'
              maxHeight='max-h-2xl'
              onClick={onUpdate}
            />
          </Match>
        </Switch>
      </div>
    </Modal>
  );
}
