import clsx from 'clsx';
import { TInput } from '../types';

export function Input({
  type,
  name,
  textSize,
  hoverFill,
  fill,
  color,
  readonly,
  disabled,
  value,
  ref,
}: Partial<TInput>) {
  const baseClass = `w-full h-[54px] ${textSize} rounded rounded-md transition-all px-3 m-2 border-0 outline-none`;
  const defaultClass = `${color} ${fill} ${hoverFill} hover:outline-1 hover:outline-primary focus:outline-1 focus:outline-primary`;
  const classDisabled = clsx(
    baseClass,
    !disabled && defaultClass,
    disabled && `bg-b-disabled text-f-disabled border-1 border-bnt-dark`,
  );
  const classReadOnly = clsx(
    baseClass,
    !readonly && defaultClass,
    readonly && 'text-primary bg-transparent outline-1 outline-primary',
  );

  return (
    <input
      ref={ref}
      type={type}
      name={name}
      value={value}
      readonly={readonly}
      disabled={disabled}
      class={readonly && !disabled ? classReadOnly : classDisabled}
    />
  );
}
