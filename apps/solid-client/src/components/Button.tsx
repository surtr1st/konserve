import clsx from 'clsx';
import { TButton } from '../types';
import { Match, Switch } from 'solid-js';

export function Button({
  label,
  fill,
  icon,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  textSize,
  hoverFill,
  disabled,
  onClick,
  className,
  title,
}: Partial<TButton>) {
  const isLightBackground =
    fill === 'bg-bnt-light' ||
    fill === 'bg-bnt-white-1' ||
    fill === 'bg-bnt-white-2';
  const clsxName = clsx(
    `font-semibold transition-all rounded m-1 p-1 grid place-items-center ${
      isLightBackground ? 'text-bnt-dark' : 'text-white'
    }`,
    !disabled &&
      `${fill} ${hoverFill} ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize} ${className} cursor-pointer`,
    disabled &&
      `bg-b-disabled text-f-disabled ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize}`,
  );

  return (
    <button
      disabled={disabled}
      class={clsxName}
      onclick={onClick}
      title={label || title}
    >
      <Switch>
        <Match when={label && !icon}>{label}</Match>
        <Match when={icon && !label}>{icon}</Match>
        <Match when={icon && label}>
          <span class='flex justify-center items-center gap-1'>
            {icon}
            {label}
          </span>
        </Match>
      </Switch>
    </button>
  );
}
