import { Button, Input } from '../components';

export function Register() {
  return (
    <main class='min-h-screen w-full flex flex-col justify-center items-center'>
      <section class='flex justify-center items-center'>
        <div class='w-[500px] p-10'>
          <h1 class='my-4 text-5xl font-bold'>REGISTRATION</h1>
          <Input
            type='text'
            name='username'
            label='Username'
            textSize='text-lg'
          />
          <Input
            type='email'
            name='email'
            label='E-Mail'
            textSize='text-lg'
          />
        </div>
        <div class='w-[500px] p-10'>
          <Input
            type='password'
            name='password'
            label='Password'
            textSize='text-lg'
          />
          <Input
            type='password'
            name='password'
            label='Confirm Password'
            textSize='text-lg'
          />
          <Input
            type='text'
            name='display-name'
            label='Display Name'
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
          href='/'
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
        >
          Already have an account? Log in here.
        </a>
      </section>
    </main>
  );
}
