import { ButtonBlock } from '../components'

export function ComponentTest() {

  return <>
    <ButtonBlock disabled label='Primary' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-xl' fill='bg-primary' hoverFill='hover:bg-secondary' color='text-fnt-light' textSize="text-md" />
    <ButtonBlock label='Secondary' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-xl' fill='bg-secondary' hoverFill='hover:bg-primary' color='text-fnt-light' textSize="text-md" />
    <ButtonBlock label='A du dark wa' minWidth='min-w-lg' maxWidth='max-w-xl' minHeight='min-h-md' maxHeight='max-h-2xl' fill='bg-primary' hoverFill='hover:bg-secondary' color='text-fnt-light' textSize="text-md" />
  </>
}
