import { Match, Switch } from 'solid-js';
import { TSection } from '../types';

export function Section({ type, children }: Partial<TSection>) {
  return (
    <Switch>
      <Match when={type === 'free'}>
        <section class='flex justify-center items-center w-full p-2'>
          {children}
        </section>
      </Match>
      <Match when={type === 'toolbar'}>
        <section class='flex justify-end items-center border border-x-transparent border-t-transparent border-b-primary w-full p-2 h-[10vh]'>
          {children}
        </section>
      </Match>
    </Switch>
  );
}
