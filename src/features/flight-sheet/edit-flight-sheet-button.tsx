import { EditIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

export function EditFlightSheetButton({
  flightSheetId
} : {
  flightSheetId: string
}) {
  const link = linkOptions({
    to: '/setup/flight-sheets/config',
    search: { id: flightSheetId }
  })

  return (
    <Link {...link}>
      <UiTooltip content='Edit flight sheet'>
        <IconButton variant="ghost" className='group' aria-label="Edit flight sheet">
          <EditIcon />
        </IconButton>
      </UiTooltip>
    </Link>
  )
}