import { UiButton } from "@/shared/ui/ui-button"
import clsx from "clsx"
import { Check } from "lucide-react"
import styles from './apply-flight-sheet-button.module.scss'

export function ApplyFlightSheetButton({
  className,
  flightSheetId
} : {
  className?: string
  flightSheetId?: string
}) {
  return (
    <UiButton className={clsx(className, styles['apply-flight-sheet-button'])} color="green">
      <Check size={22} />
    </UiButton>
  )
}