import { flightSheetRepository } from "@/entities/flight-sheet";
import { TrashIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";

const { useFlightSheetMutation } = flightSheetRepository;

export function DeleteFlightSheetButton({
  flightSheetId
} : {
  flightSheetId: string
}) {
  const { deleteFlightSheet } = useFlightSheetMutation();

  const handleClick = async () => {
    await deleteFlightSheet(flightSheetId);
  }

  return (
    <UiTooltip content='Delete flight sheet'>
      <IconButton variant="ghost" className='group' aria-label="Delete flight sheet" onClick={handleClick}>
        <TrashIcon />
      </IconButton>
    </UiTooltip>
  )
}