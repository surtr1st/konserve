import clsx from 'clsx';
import { TModal } from '../types';
import { useLockScroll } from '../hooks';
import { Show, createEffect } from 'solid-js';
import { Portal } from 'solid-js/web';

export function Modal({
  open,
  fill,
  color,
  children,
  onBackdropClick,
  onClose,
  className,
  label,
  bodyClass,
  zIndex,
  backdropZIndex,
}: TModal) {
  const baseClass = `${fill} ${color} ${className} drop-shadow-lg outline outline-1 outline-primary rounded rounded-xl grid place-items-center`;
  const positionClass = `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
    zIndex || 'z-50'
  }`;
  const sizeClass =
    'min-w-[500px] max-w-[700px] min-h-[200px] max-h-[700px] overflow-y-auto overflow-x-hidden';
  const clsxName = clsx(baseClass, positionClass, sizeClass);

  const { lock, release } = useLockScroll();

  createEffect(() => {
    if (open()) lock();
    else release();
  });

  return (
    <Portal>
      <Show when={open()}>
        <div class={clsxName}>
          <div
            class={clsx(
              className &&
                `flex w-full justify-between items-center rounded-t-xl h-20 pl-7 pr-3 sticky top-0 z-30 ${className}`,
            )}
          >
            <h3 class='text-2xl font-semibold'>{label}</h3>
            <span
              class='text-bnt-dark px-5 py-3 text-center dark:text-white cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
              onclick={onClose}
            >
              &times;
            </span>
          </div>
          <span class={bodyClass}>{children}</span>
        </div>
        <div
          class={clsx(
            className &&
              `bg-opacity-70 bg-bnt-dark fixed top-0 left-0 w-full h-screen ${
                backdropZIndex || 'z-10'
              }`,
          )}
          onClick={onBackdropClick}
        ></div>
      </Show>
    </Portal>
  );
}
