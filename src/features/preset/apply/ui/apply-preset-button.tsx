import clsx from "clsx"
import { Check } from "lucide-react"
import styles from './apply-preset-button.module.scss'

export function ApplyPresetButton({
  className
} : {
  className?: string
}) {
  return (
    <button className={clsx(styles['apply-preset-button'], className)}>
      <Check width={30} />
    </button>
  )
}