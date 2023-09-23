import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { TModal } from '../types';

export function Modal({
  open,
  fill,
  color,
  children,
  onBackdropClick,
}: Partial<TModal>) {
  const baseClass = `${fill} ${color} drop-shadow-lg outline outline-1 outline-primary rounded rounded-2`;
  const positionClass =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20';
  const sizeClass = 'min-w-[500px] max-w-[700px] min-h-[200px] max-h-[700px]';
  const className = clsx(baseClass, positionClass, sizeClass);

  return createPortal(
    <>
      <dialog
        open={open}
        className={className}
      >
        {children}
      </dialog>
      {open && (
        <div
          className='bg-opacity-70 bg-bnt-dark fixed top-0 left-0 w-full h-screen z-10'
          onClick={onBackdropClick}
        ></div>
      )}
    </>,
    document.getElementById('root') as HTMLElement,
  );
}
