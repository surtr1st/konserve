import clsx from 'clsx';
import { TButton } from '../types';

export function Button({
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
  onClick,
}: TButton) {
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
      class={className}
      onclick={onClick}
    >
      {label}
    </button>
  );
}
