import { ButtonBlock, InputBlock } from '../components'

export function ComponentTest() {

  return <>
    <ButtonBlock label='Primary' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-xl' fill='bg-primary' hoverFill='hover:bg-secondary' color='text-fnt-light' textSize="text-md" />
    <ButtonBlock label='Secondary' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-xl' fill='bg-secondary' hoverFill='hover:bg-primary' color='text-fnt-light' textSize="text-md" />
    <ButtonBlock label='Danger' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-2xl' fill='bg-danger' hoverFill='hover:bg-light-danger' color='text-fnt-light' textSize="text-md" />
    <ButtonBlock label='Dark' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-2xl' fill='bg-bnt-dark' hoverFill='hover:bg-b-disabled' color='text-fnt-light' textSize="text-md" />
    <ButtonBlock label='Light' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-2xl' fill='bg-bnt-light' hoverFill='hover:bg-bnt-white-1' color='text-fnt-dark' textSize="text-md" />
    <ButtonBlock disabled label='Disabled' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-2xl' textSize="text-md" />
    <InputBlock textSize='text-lg' color='text-fnt-dark' fill='bg-bnt-white-1' hoverFill='hover:bg-bnt-white-2' />
    <InputBlock disabled value='A dud dark wa' textSize='text-lg' color='text-fnt-dark' fill='bg-bnt-white-1' hoverFill='hover:bg-bnt-white-2' />
    <InputBlock readonly value='A dud dark wa 123' textSize='text-lg' color='text-fnt-dark' fill='bg-bnt-white-1' hoverFill='hover:bg-bnt-white-2' />
  </>
}
