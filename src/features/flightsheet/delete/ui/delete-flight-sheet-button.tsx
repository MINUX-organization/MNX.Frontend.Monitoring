import { UiButton } from "@/shared/ui/ui-button"
import clsx from "clsx";
import { Trash2 } from "lucide-react"
import styles from './delete-flight-sheet-button.module.scss'
import { useFlightSheetRepository } from "@/entities/flightsheet";

export function DeleteFlightSheetButton({
  className,
  flightSheetId
} : {
  className?: string;
  flightSheetId?: string;
}) {
  const { deleteFlightSheet } = useFlightSheetRepository();

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!flightSheetId) return;

    deleteFlightSheet(flightSheetId);
  }

  return (
    <UiButton onClick={handle} className={clsx(className, styles['delete-flight-sheet-button'])} color="red">
      <Trash2 size={20} />
    </UiButton>
  )
}