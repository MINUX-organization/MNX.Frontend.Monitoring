import { UiButton } from "@/shared/ui/ui-button"
import clsx from "clsx"
import { Pencil } from "lucide-react"
import styles from './edit-flight-sheet-button.module.scss'
import { useNavigate } from "react-router"

export function EditFlightSheetButton({
  className,
  flightSheetId,
} : {
  className?: string
  flightSheetId?: string
}) {
  const navigate = useNavigate();

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();

    navigate(`config?flightSheetId=${flightSheetId}`)
  }

  return (
    <UiButton 
      className={clsx(className, styles['edit-flight-sheet-button'])}
      onClick={handle}
      color="blue">
      <Pencil size={18} />
    </UiButton>
  )
}