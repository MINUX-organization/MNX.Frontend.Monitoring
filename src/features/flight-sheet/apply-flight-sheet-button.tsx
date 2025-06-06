import { ConfirmedIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

export function ApplyFlightSheetButton({
  flightSheetId
} : {
  flightSheetId: string
}) {
  const link = linkOptions({
    to: '/setup/flight-sheets/$flightSheetId/apply',
    params: { flightSheetId },
  })
    
  return (
    <Link {...link}>
      <IconButton variant="ghost" className='group' aria-label="Apply flight sheet">
        <ConfirmedIcon />
      </IconButton>
    </Link>
  )
}