import { Button } from '../components';

export function Preference() {
  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <section class='flex justify-end items-center border border-x-transparent border-t-transparent border-b-primary w-full p-2'>
        <Button
          label='Save'
          minWidth='min-w-md'
          maxWidth='max-w-md'
          minHeight='min-h-lg'
          maxHeight='max-h-lg'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          color='text-fnt-light'
        />
        <Button
          label='Cancel'
          minWidth='min-w-md'
          maxWidth='max-w-md'
          minHeight='min-h-lg'
          maxHeight='max-h-lg'
          fill='bg-secondary'
          hoverFill='hover:bg-primary'
          color='text-fnt-light'
        />
      </section>
      <section class='grid place-items-center w-[1600px] h-[90vh]'></section>
    </main>
  );
}
