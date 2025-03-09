import { ConfirmedIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

export function ApplyPresetButton({
  presetId
} : {
  presetId: string
}) {
  const link = linkOptions({
    to: '/setup/presets/$presetId/apply',
    params: { presetId }
  })
    
  return (
    <Link {...link}>
      <IconButton variant="ghost" className='group' aria-label="Apply flight sheet">
        <ConfirmedIcon />
      </IconButton>
    </Link>
  )
}