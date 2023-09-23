import clsx from 'clsx';
import { block } from 'million/react';
import { TButton } from '../types';

export const ButtonBlock = block(
  ({
    label,
    fill,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    textSize,
    color,
    hoverFill,
    disabled,
  }: Partial<TButton>) => {
    const className = clsx(
      'font-semibold transition-all rounded m-1 p-1',
      !disabled &&
        `${fill} ${hoverFill} ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize} ${color} cursor-pointer`,
      disabled &&
        `bg-b-disabled text-f-disabled ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize}`,
    );
    return (
      <button
        disabled={disabled}
        className={className}
      >
        {label}
      </button>
    );
  },
);
