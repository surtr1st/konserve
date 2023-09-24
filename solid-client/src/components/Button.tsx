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
  color,
  hoverFill,
  disabled,
  onClick,
  customClass,
  title,
}: TButton) {
  const className = clsx(
    'font-semibold transition-all rounded m-1 p-1 grid place-items-center',
    !disabled &&
      `${fill} ${hoverFill} ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize} ${color} ${customClass} cursor-pointer`,
    disabled &&
      `bg-b-disabled text-f-disabled ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize}`,
  );

  return (
    <button
      disabled={disabled}
      class={className}
      onclick={onClick}
      title={label || title}
    >
      <Switch>
        <Match when={label}>{label}</Match>
        <Match when={icon}>{icon}</Match>
        <Match when={icon && label}>
          {icon}
          {label}
        </Match>
      </Switch>
    </button>
  );
}
