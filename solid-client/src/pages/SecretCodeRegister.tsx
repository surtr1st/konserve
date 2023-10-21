import { useLocation, useNavigate } from '@solidjs/router';
import { Button, Input } from '../components';
import { TAccountRegister } from '../types';
import { useUser } from '../services';
import { useSolidToast } from '../hooks';

export function SecretCodeRegister() {
  const navigate = useNavigate();
  const location = useLocation<TAccountRegister>();
  const { createUser } = useUser();
  const { onSuccess, onError } = useSolidToast();
  let secretCode: SolidInputRef;

  const registrate = () => {
    const unwrapSecretCode = (secretCode as HTMLInputElement).value;
    if (!unwrapSecretCode) {
      onError('Before you could proceed! Secret code is crucial!');
      return;
    }
    createUser({ ...location.state, secretCode: unwrapSecretCode })
      .then((ok) => {
        if (ok) {
          onSuccess('Registered successfully!');
          navigate('/login', { replace: true });
        }
      })
      .catch((err: ResponseError) => onError(err.message));
  };
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
            ref={secretCode}
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
          onClick={() => registrate()}
        />
        <a
          class='p-2 my-2 cursor-pointer transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'
          onClick={() => navigate('/register', { replace: true })}
        >
          Back
        </a>
      </section>
    </main>
  );
}
