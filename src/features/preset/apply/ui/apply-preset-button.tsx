import clsx from "clsx"
import { Check } from "lucide-react"
import styles from './apply-preset-button.module.scss'

export function ApplyPresetButton({
  className,
  presetId,
  isIcon,
} : {
  className?: string;
  presetId?: string;
  isIcon?: boolean;
}) {
  return (
    <button className={clsx(!isIcon && styles['apply-preset-button'], className)}>
      <Check width={30} />
    </button>
  )
}