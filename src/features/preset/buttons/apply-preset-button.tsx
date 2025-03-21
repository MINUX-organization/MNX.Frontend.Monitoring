import { ConfirmedIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

export function ApplyPresetButton({
  presetId,
  type = 'link'
} : {
  presetId: string
  type?: 'action' | 'link'
}) {
  // const handleClick = () => {
    
  // }

  if (type === 'action') return (
    <IconButton variant="ghost" className='group' aria-label="Apply preset">
      <ConfirmedIcon />
    </IconButton>
  )

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