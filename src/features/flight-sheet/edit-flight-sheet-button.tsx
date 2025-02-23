import { EditIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

export function EditFlightSheetButton({
  flightSheetId
} : {
  flightSheetId: string
}) {
  const link = linkOptions({
    to: 'config',
    search: { id: flightSheetId }
  })

  return (
    <Link {...link}>
      <IconButton variant="ghost" className='group' aria-label="Edit flight sheet">
        <EditIcon />
      </IconButton>
    </Link>
  )
}