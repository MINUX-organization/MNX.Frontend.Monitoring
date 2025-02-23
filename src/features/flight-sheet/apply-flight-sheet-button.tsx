import { ConfirmedIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";

// {
//   flightSheetId
// } : {
//   flightSheetId: string
// }

export function ApplyFlightSheetButton() {

  return (
    <IconButton variant="ghost" className='group' aria-label="Apply flight sheet">
      <ConfirmedIcon />
    </IconButton>
  )
}