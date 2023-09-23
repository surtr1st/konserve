import { block } from "million/react"
import { Button } from '../types'
import { useState } from "react"


export const ButtonBlock = block(({ label, fill, size, color }: Button) => {
  const [className, setClassName] = useState('')

  return <button className={className}>{label && label}</button>
})

