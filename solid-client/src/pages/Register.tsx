import { createSignal } from 'solid-js';
import { Button, Input } from '../components';
import { useNavigate } from '@solidjs/router';
import { TAccountRegister } from '../types';
import { useSolidToast } from '../hooks';

export function Register() {
  const navigate = useNavigate();
  let email: SolidInputRef;
  let username: SolidInputRef;
  let password: SolidInputRef;
  let confirmPassword: SolidInputRef;
  let displayName: SolidInputRef;

  const { onError } = useSolidToast();
  const [account, setAccount] = createSignal<Partial<TAccountRegister>>({});

  const toNextStep = () => {
    const unwrapEmail = (email as HTMLInputElement).value;
    const unwrapUsername = (username as HTMLInputElement).value;
    const unwrapPassword = (password as HTMLInputElement).value;
    const unwrapConfirmPassword = (confirmPassword as HTMLInputElement).value;
    const unwrapDisplayName = (displayName as HTMLInputElement).value;

    if (!unwrapEmail) {
      onError('Email is required!');
      return;
    }
    if (!unwrapUsername) {
      onError('Username is required!');
      return;
    }
    if (!unwrapPassword) {
      onError('Password is required!');
      return;
    }
    if (!unwrapConfirmPassword) {
      onError('Confirm password is empty!');
      return;
    }
    if (unwrapConfirmPassword !== unwrapPassword) {
      onError('Confirm password does not match with the current password!');
      return;
    }

    setAccount({
      email: unwrapEmail,
      username: unwrapUsername,
      password: unwrapPassword,
      displayName: !unwrapDisplayName
        ? `@${unwrapUsername}`
        : unwrapDisplayName,
    });

    navigate('/register/final', { state: account(), replace: false });
  };

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
            ref={username}
          />
          <Input
            type='email'
            name='email'
            label='E-Mail'
            textSize='text-lg'
            ref={email}
          />
        </div>
        <div class='w-[500px] p-10'>
          <Input
            type='password'
            name='password'
            label='Password'
            textSize='text-lg'
            ref={password}
          />
          <Input
            type='password'
            name='password'
            label='Confirm Password'
            textSize='text-lg'
            ref={confirmPassword}
          />
          <Input
            type='text'
            name='display-name'
            label='Display Name (Optional)'
            textSize='text-lg'
            ref={displayName}
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
          onClick={() => toNextStep()}
        />
        <a
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
          onClick={() => navigate('/login', { replace: true })}
        >
          Already have an account? Log in here.
        </a>
      </section>
    </main>
  );
}
