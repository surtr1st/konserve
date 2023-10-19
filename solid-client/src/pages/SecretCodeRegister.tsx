import { useNavigate } from '@solidjs/router';
import { Button, Input } from '../components';

export function SecretCodeRegister() {
  const navigate = useNavigate();
  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <section class='flex justify-center items-center text-center'>
        <div class='w-[800px] p-10'>
          <h1 class='my-4 text-5xl font-bold uppercase'>
            Add your secret code
          </h1>
          <Input
            type='password'
            name='Secret Code'
            label='Secret Code'
            textSize='text-lg'
          />
        </div>
      </section>
      <section class='flex flex-col justify-center items-center mt-3'>
        <Button
          title='Register'
          label='Register'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          minWidth='min-w-lg'
          maxWidth='max-w-xl'
          minHeight='min-h-md'
          maxHeight='max-h-2xl'
          textSize='text-md'
        />
        <a
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
          onClick={() => navigate('/register')}
        >
          Back
        </a>
      </section>
    </main>
  );
}
