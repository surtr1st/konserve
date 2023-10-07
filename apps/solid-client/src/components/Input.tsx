import clsx from 'clsx';
import { TInput } from '../types';
import { Show } from 'solid-js';

export function Input({
  type,
  name,
  textSize,
  readonly,
  disabled,
  value,
  ref,
  label,
}: Partial<TInput>) {
  const baseClass = `w-full h-[54px] ${textSize} rounded rounded-md transition-all px-3 my-2 border-0 outline-none`;
  const defaultClass = `bg-bnt-white-1 hover:bg-bnt-white-2 dark:bg-bnt-dark-2 dark:hover:bg-bnt-dark-1 hover:outline-1 hover:outline-primary focus:outline-1 focus:bg-bnt-white-2 focus:outline-primary dark:focus:bg-bnt-dark-1 dark:caret-bnt-white-1`;
  const classDisabled = clsx(
    baseClass,
    !disabled && defaultClass,
    disabled && `bg-b-disabled text-f-disabled border-1 border-bnt-dark`,
  );
  const classReadOnly = clsx(
    baseClass,
    !readonly && defaultClass,
    readonly && 'text-primary bg-transparent outline-1 outline-b-disabled',
  );

  return (
    <div class='flex flex-col justify-center items-start w-full'>
      <Show when={label}>
        <label
          for={name}
          class='my-2 text-2xl font-semibold'
        >
          {label}
        </label>
      </Show>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value || ''}
        placeholder={label || ''}
        readonly={readonly}
        disabled={disabled}
        class={readonly && !disabled ? classReadOnly : classDisabled}
      />
    </div>
  );
}
