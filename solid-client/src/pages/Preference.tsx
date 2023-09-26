import { Button, Section } from '../components';

export function Preference() {
  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <Section type='toolbar'>
        <Button
          label='Save'
          minWidth='min-w-lg'
          maxWidth='max-w-lg'
          minHeight='min-h-md'
          maxHeight='max-h-md'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          color='text-fnt-light'
          textSize='text-md'
        />
        <Button
          label='Cancel'
          minWidth='min-w-lg'
          maxWidth='max-w-lg'
          minHeight='min-h-md'
          maxHeight='max-h-md'
          fill='bg-secondary'
          hoverFill='hover:bg-primary'
          color='text-fnt-light'
          textSize='text-md'
        />
      </Section>
      <section class='grid place-items-center w-[1600px] h-[90vh]'></section>
    </main>
  );
}
