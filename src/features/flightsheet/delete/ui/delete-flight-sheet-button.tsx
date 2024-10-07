import { UiButton } from "@/shared/ui/ui-button"
import clsx from "clsx";
import { Trash2 } from "lucide-react"
import styles from './delete-flight-sheet-button.module.scss'

export function DeleteFlightSheetButton({
  className,
  flightSheetId
} : {
  className?: string;
  flightSheetId?: string;
}) {
  return (
    <UiButton className={clsx(className, styles['delete-flight-sheet-button'])} color="red">
      <Trash2 size={20} />
    </UiButton>
  )
}