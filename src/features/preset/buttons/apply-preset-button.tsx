import { presetRepository } from "@/entities/preset";
import { ConfirmedIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";

const { usePresetMutation } = presetRepository;

export function ApplyPresetButton({
  presetId,
  deviceId,
  type = 'link'
} : {
  presetId: string
  deviceId?: string
  type?: 'action' | 'link'
}) {
  const { applyPresetDevices } = usePresetMutation();

  const handleClick = () => {
    applyPresetDevices({id: presetId, data: [deviceId ?? '']});
  }

  if (type === 'action') return (
    <IconButton variant="ghost" className='group' onClick={handleClick} aria-label="Apply preset">
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