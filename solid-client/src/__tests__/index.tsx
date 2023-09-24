import { createSignal } from 'solid-js';
import { Button, Input, Modal } from '../components';

export function ComponentTest() {
  const [open, setOpen] = createSignal(false);

  let inputRef:
    | HTMLInputElement
    | ((el: HTMLInputElement) => undefined)
    | undefined = undefined;

  const handleOpen = () => {
    setOpen(!open());
  };

  const handleText = () => {
    if (!inputRef) return;
    const value = (inputRef as HTMLInputElement).value;
    console.log(value);
  };

  return (
    <>
      <Button
        label='Primary'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-xl'
        fill='bg-primary'
        hoverFill='hover:bg-secondary'
        color='text-fnt-light'
        textSize='text-md'
      />
      <Button
        label='Secondary'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-xl'
        fill='bg-secondary'
        hoverFill='hover:bg-primary'
        color='text-fnt-light'
        textSize='text-md'
      />
      <Button
        label='Danger'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-2xl'
        fill='bg-danger'
        hoverFill='hover:bg-light-danger'
        color='text-fnt-light'
        textSize='text-md'
      />
      <Button
        label='Dark'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-2xl'
        fill='bg-bnt-dark'
        hoverFill='hover:bg-b-disabled'
        color='text-fnt-light'
        textSize='text-md'
      />
      <Button
        label='Light'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-2xl'
        fill='bg-bnt-light'
        hoverFill='hover:bg-bnt-white-1'
        color='text-fnt-dark'
        textSize='text-md'
      />
      <Button
        disabled
        label='Disabled'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-2xl'
        textSize='text-md'
      />
      <Input
        textSize='text-lg'
        color='text-fnt-dark'
        fill='bg-bnt-white-1'
        hoverFill='hover:bg-bnt-white-2'
        ref={inputRef}
      />
      <Button
        label='Get Text'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-2xl'
        fill='bg-bnt-light'
        hoverFill='hover:bg-bnt-white-1'
        color='text-fnt-dark'
        textSize='text-md'
        onClick={handleText}
      />
      <Input
        disabled
        value='A dud dark wa'
        textSize='text-lg'
        color='text-fnt-dark'
        fill='bg-bnt-white-1'
        hoverFill='hover:bg-bnt-white-2'
      />
      <Input
        readonly
        value='A dud dark wa 123'
        textSize='text-lg'
        color='text-fnt-dark'
        fill='bg-bnt-white-1'
        hoverFill='hover:bg-bnt-white-2'
      />
      <Button
        label='Open Modal'
        minWidth='min-w-lg'
        maxWidth='max-w-xl'
        minHeight='min-h-md'
        maxHeight='max-h-2xl'
        fill='bg-bnt-dark'
        hoverFill='hover:bg-b-disabled'
        color='text-fnt-light'
        textSize='text-md'
        onClick={handleOpen}
      />
      <Modal
        open={() => open()}
        fill='bg-bnt-dark'
        onBackdropClick={handleOpen}
      ></Modal>
    </>
  );
}
