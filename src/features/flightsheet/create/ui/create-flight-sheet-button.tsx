import { UiButton } from "@/shared/ui/ui-button";
import { useNavigate } from "react-router";

export function CreateFlightSheetButton({
  className
} : {
  className?: string
}) {
  const navigate = useNavigate();

  const handle = () => {
    navigate('config')
  }

  return (
    <UiButton onClick={handle} className={className} color="blue" withBorder>
      <span>Create Flight Sheet</span>
    </UiButton>
  )
}