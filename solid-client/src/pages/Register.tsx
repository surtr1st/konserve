import { Button, Input } from '../components';
import { useNavigate } from '@solidjs/router';

export function Register() {
  const navigate = useNavigate();
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
            label='Display Name (Optional)'
            textSize='text-lg'
          />
        </div>
      </section>
      <section class='flex flex-col justify-center items-center mt-3'>
        <Button
          title='Continue'
          label='Continue'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          minWidth='min-w-lg'
          maxWidth='max-w-xl'
          minHeight='min-h-md'
          maxHeight='max-h-2xl'
          textSize='text-md'
          onClick={() => navigate('/register/secret-code')}
        />
        <a
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
          onClick={() => navigate('/login')}
        >
          Already have an account? Log in here.
        </a>
      </section>
    </main>
  );
}
