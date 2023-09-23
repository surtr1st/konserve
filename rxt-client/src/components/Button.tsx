import clsx from "clsx"
import { block } from "million/react"
import { TButton } from '../types'

export const ButtonBlock = block(({ label, fill, minWidth, maxWidth, minHeight, maxHeight, textSize, color, hoverFill, disabled }: Partial<TButton>) => {
  const className = clsx('',
    !disabled && `${fill} ${hoverFill} ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize} ${color} font-semibold transition-all rounded m-1 p-1 cursor-pointer`,
    disabled && `bg-b-disabled text-f-disabled ${minWidth} ${maxWidth} ${minHeight} ${maxHeight} ${textSize} font-semibold transition-all rounded m-1 p-1`
  )
  return <button disabled={disabled} className={className}>{label}</button>
})

