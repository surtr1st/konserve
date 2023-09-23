import clsx from 'clsx';
import { block } from 'million/react';
import { createPortal } from 'react-dom';
import { TModal } from '../types';

export const ModalBlock = block(
  ({ open, fill, color, children }: Partial<TModal>) => {
    const className = clsx(`${fill} ${color}`);
    return createPortal(
      <dialog
        open={open}
        className={className}
      >
        {children}
      </dialog>,
      document.getElementById('root') as HTMLElement,
    );
  },
);
