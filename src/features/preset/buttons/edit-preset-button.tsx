import { EditIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

export function EditPresetButton({
  presetId
} : {
  presetId: string
}) {
  const link = linkOptions({
    to: '/setup/presets/config',
    search: { presetId }
  })

  return (
    <Link {...link}>
      <IconButton variant="ghost" className='group' aria-label="Edit preset">
        <EditIcon />
      </IconButton>
    </Link>
  )
}