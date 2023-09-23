import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';
import { TInput } from '../types';

export const Input = forwardRef(
  (
    {
      type,
      name,
      textSize,
      hoverFill,
      fill,
      color,
      readonly,
      disabled,
      value,
    }: Partial<TInput>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
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
        ref={ref}
        value={value}
        readOnly={readonly}
        disabled={disabled}
        className={readonly && !disabled ? classReadOnly : classDisabled}
      />
    );
  },
);
