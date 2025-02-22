import { PlusIcon } from "@/shared/assets/svg";
import { UiButton } from "@/shared/ui";
import { useNavigate } from "@tanstack/react-router";

export function AddFlightSheetButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: 'config' });
  }

  return (
    <UiButton colorPalette={'accept'} onClick={handleClick}>
      Add <PlusIcon />
    </UiButton>
  )
}