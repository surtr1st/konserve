import { Button, Input } from '../components';

export function Login() {
  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <section class='grid place-items-center'>
        <div class='w-[700px] p-10'>
          <h1 class='my-4 text-5xl font-bold'>LOG IN</h1>
          <Input
            type='text'
            name='username'
            label='Username'
            textSize='text-lg'
          />
          <Input
            type='password'
            name='password'
            label='Password'
            textSize='text-lg'
          />
        </div>
      </section>
      <section class='flex flex-col justify-center items-center mt-3'>
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
        <a
          href='/register'
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
        >
          Does not have an account? Register here.
        </a>
      </section>
    </main>
  );
}
