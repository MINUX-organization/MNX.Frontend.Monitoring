import { UiButton } from "@/shared/ui/ui-button";
import { useNavigate } from "react-router";

export function CreatePresetButton({
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
      <span>&#43; Create Preset</span>
    </UiButton>
  )
}