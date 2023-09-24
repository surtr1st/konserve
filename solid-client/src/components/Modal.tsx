import clsx from 'clsx';
import { TModal } from '../types';
import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';

export function Modal({
  open,
  fill,
  color,
  children,
  onBackdropClick,
}: TModal) {
  const baseClass = `${fill} ${color} drop-shadow-lg outline outline-1 outline-primary rounded rounded-2`;
  const positionClass =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20';
  const sizeClass = 'min-w-[500px] max-w-[700px] min-h-[200px] max-h-[700px]';
  const className = clsx(baseClass, positionClass, sizeClass);

  return (
    <Portal>
      <Show when={open()}>
        <div class={className}>{children}</div>
        <div
          class='bg-opacity-70 bg-bnt-dark fixed top-0 left-0 w-full h-screen z-10'
          onClick={onBackdropClick}
        ></div>
      </Show>
    </Portal>
  );
}
