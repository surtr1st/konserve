import { block } from 'million/react';
import { TInput } from '../types';
import clsx from 'clsx';

export const InputBlock = block(
  ({
    type,
    name,
    textSize,
    hoverFill,
    fill,
    color,
    readonly,
    disabled,
    value,
  }: Partial<TInput>) => {
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
        type={type}
        name={name}
        readOnly={readonly}
        disabled={disabled}
        className={readonly && !disabled ? classReadOnly : classDisabled}
        value={value}
      />
    );
  },
);
