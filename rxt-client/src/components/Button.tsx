import { block } from "million/react"
import { Button } from '../types'

export const ButtonBlock = block(({ label, fill, width, height, textSize, color }: Partial<Button>) =>
  <button className={`bg-${fill} hover:bg-secondary hover:transition-all w-${width} h-${height} font-semibold text-${textSize} text-${color} rounded`}>{label}</button>
)

