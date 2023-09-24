import { Button, Input } from '../components';

export function Login() {
  return (
    <main class='min-h-screen w-full'>
      <section class='grid place-items-center'>
        <div class='w-[700px] h-40 border-1 border-primary'>
          <Input
            type='text'
            name='username'
            textSize='text-lg'
            color='text-fnt-dark'
            fill='bg-bnt-white-1'
            hoverFill='hover:bg-bnt-white-2'
          />
          <Input
            type='password'
            name='password'
            textSize='text-lg'
            color='text-fnt-dark'
            fill='bg-bnt-white-1'
            hoverFill='hover:bg-bnt-white-2'
          />
        </div>
      </section>
      <section class='flex flex-col justify-center items-center'>
        <Button
          title='Log in'
          label='Log in'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          minWidth='min-w-lg'
          maxWidth='max-w-xl'
          minHeight='min-h-md'
          maxHeight='max-h-2xl'
          textSize='text-md'
        />
      </section>
    </main>
  );
}
