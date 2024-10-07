import { UiButton } from "@/shared/ui/ui-button"
import clsx from "clsx"
import { Pencil } from "lucide-react"
import styles from './edit-flight-sheet-button.module.scss'

export function EditFlightSheetButton({
  className,
  flightSheetId,
} : {
  className?: string
  flightSheetId?: string
}) {
  return (
    <UiButton className={clsx(className, styles['edit-flight-sheet-button'])} color="blue">
      <Pencil size={18} />
    </UiButton>
  )
}