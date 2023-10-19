import { onMount } from 'solid-js';
import { Button, Input } from '../components';
import { useAuth } from '../services';
import { useNavigate } from '@solidjs/router';

export function Login() {
  const navigate = useNavigate();
  const { authenticate, isAuthorized } = useAuth();
  let username:
    | HTMLInputElement
    | ((el: HTMLInputElement) => undefined)
    | undefined = undefined;
  let password:
    | HTMLInputElement
    | ((el: HTMLInputElement) => undefined)
    | undefined = undefined;

  const login = () => {
    const unwrapUsername = (username as HTMLInputElement).value;
    const unwrapPassword = (password as HTMLInputElement).value;
    authenticate({ username: unwrapUsername, password: unwrapPassword })
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  };

  onMount(() => {
    isAuthorized().then((ok) => ok && navigate('/', { replace: true }));
  });

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
            value='test@uname'
            ref={username}
          />
          <Input
            type='password'
            name='password'
            label='Password'
            textSize='text-lg'
            value='test@pwd'
            ref={password}
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
          onClick={login}
        />
        <a
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
          onClick={() => navigate('/register')}
        >
          Does not have an account? Register here.
        </a>
      </section>
    </main>
  );
}
