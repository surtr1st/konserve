import clsx from 'clsx';
import { createSignal } from 'solid-js';
import { TLeaf } from '../types';
import { Button } from '.';
import {
  CopyFilledIcon,
  CopyIcon,
  DeleteFilledIcon,
  PasswordBoldIcon,
  User5FillIcon,
} from './icons';

export function Leaf({
  username,
  password,
  onCopyUsername,
  onCopyPassword,
  onExtraAction,
}: Partial<TLeaf>) {
  const [censor, setCensor] = createSignal(true);
  const uncencor = () => setCensor(!censor());

  return (
    <div
      title='View'
      class='relative flex flex-col items-center w-[500px] h-60 m-2 rounded-lg border border-primary bg-transparent hover:bg-bnt-dark cursor-pointer transition-all'
    >
      <div class='w-full h-24 bg-none flex text-left justify-center items-end text-[24px] gap-1 mt-10'>
        <span>
          <span class='flex items-center gap-2'>
            <User5FillIcon />
            <h3 class='p-1 transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30'>
              {username}
            </h3>
          </span>
          <span class='flex items-center gap-2'>
            <PasswordBoldIcon />
            <h3
              onclick={uncencor}
              class={clsx(
                'p-1 transition-all rounded-lg bg-transparent hover:bg-b-disabled hover:bg-opacity-30',
                censor() && 'blur-lg',
                !censor() && 'blur-none',
              )}
            >
              {password}
            </h3>
          </span>
        </span>
      </div>
      <div class='absolute bottom-0 flex justify-around m-2 w-full'>
        <Button
          label='Delete'
          title='Delete account leaf'
          fill='bg-danger'
          hoverFill='hover:bg-b-disabled'
          minWidth='min-w-lg'
          maxWidth='max-w-xl'
          minHeight='min-h-md'
          maxHeight='max-h-xl'
          color='text-fnt-light'
          textSize='text-md'
          icon={<DeleteFilledIcon />}
          onClick={onExtraAction}
        />
        <div class='flex'>
          <Button
            title='Copy username'
            fill='bg-bnt-dark'
            hoverFill='hover:bg-b-disabled'
            minWidth='min-w-lg'
            maxWidth='max-w-xl'
            minHeight='min-h-md'
            maxHeight='max-h-xl'
            color='text-fnt-light'
            textSize='text-md'
            icon={<CopyFilledIcon />}
            onClick={onCopyUsername}
          />
          <Button
            title='Copy password'
            fill='bg-bnt-dark'
            hoverFill='hover:bg-b-disabled'
            minWidth='min-w-lg'
            maxWidth='max-w-xl'
            minHeight='min-h-md'
            maxHeight='max-h-xl'
            color='text-fnt-light'
            textSize='text-md'
            icon={<CopyIcon />}
            onClick={onCopyPassword}
          />
        </div>
      </div>
    </div>
  );
}
