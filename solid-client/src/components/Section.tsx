import { Match, Switch } from 'solid-js';
import { TSection } from '../types';

export function Section({
  label,
  type,
  children,
  className,
}: Partial<TSection>) {
  return (
    <Switch>
      <Match when={type === 'free'}>
        <section class={`w-full p-2 ${className}`}>{children}</section>
      </Match>
      <Match when={type === 'heading'}>
        <section class={`flex flex-col items-start p-2 my-3 ${className}`}>
          <h3 class='text-[24px] font-semibold mx-1 mb-7'>{label}</h3>
          <div class='flex justify-start items-center w-full'>{children}</div>
        </section>
      </Match>
      <Match when={type === 'toolbar'}>
        <section
          class={`flex justify-end items-center border border-x-transparent border-t-transparent border-b-primary w-full p-2 h-[10vh] ${className}`}
        >
          {children}
        </section>
      </Match>
      <Match when={type === 'grid'}>
        <section
          class={`grid place-items-center w-[1600px] h-[90vh] ${className}`}
        >
          {children}
        </section>
      </Match>
    </Switch>
  );
}
