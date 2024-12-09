import { UiButton } from "@/shared/ui/ui-button"
import clsx from "clsx"
import { Check } from "lucide-react"
import styles from './apply-flight-sheet-button.module.scss'
import { useNavigate } from "react-router"

export function ApplyFlightSheetButton({
  className,
  flightSheetId
} : {
  className?: string
  flightSheetId?: string
}) {
  const navigate = useNavigate();

  return (
    <UiButton 
      className={clsx(className, styles['apply-flight-sheet-button'])} 
      color="green"
      onClick={() => navigate(`${flightSheetId}`)}>
      <Check size={22} />
    </UiButton>
  )
}