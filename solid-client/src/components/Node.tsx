import { Button } from '.';
import { TNode } from '../types';
import { CopyFilledIcon, CopyIcon, EyeIcon } from '../components/icons';

export function Node({
  src,
  onView,
  onViewDetail,
  onCopyUsername,
  onCopyPassword,
}: Partial<TNode>) {
  return (
    <div class='relative w-72 h-72 m-2 rounded-lg border border-primary bg-transparent hover:bg-bnt-dark cursor-pointer transition-all'>
      <picture onclick={onView}>
        <source src={src} />
      </picture>
      <div class='absolute top-0 right-0 flex flex-col m-2'>
        <Button
          title='View detail'
          fill='bg-primary'
          hoverFill='hover:bg-secondary'
          customClass='h-10 w-10'
          icon={<EyeIcon />}
          onClick={onViewDetail}
        />
        <Button
          title='Copy username'
          fill='bg-bnt-dark'
          hoverFill='hover:bg-b-disabled'
          customClass='h-10 w-10'
          icon={<CopyIcon />}
          onClick={onCopyUsername}
        />
        <Button
          title='Copy password'
          fill='bg-bnt-dark'
          hoverFill='hover:bg-b-disabled'
          customClass='h-10 w-10'
          icon={<CopyFilledIcon />}
          onClick={onCopyPassword}
        />
      </div>
    </div>
  );
}
