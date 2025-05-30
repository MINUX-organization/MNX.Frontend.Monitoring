import { presetRepository } from "@/entities/preset";
import { ConfirmedIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
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
    <UiTooltip content='Apply preset'>
      <IconButton variant="ghost" className='group' onClick={handleClick} aria-label="Apply preset">
        <ConfirmedIcon />
      </IconButton>
    </UiTooltip>
  )

  const link = linkOptions({
    to: '/setup/presets/$presetId/apply',
    params: { presetId }
  })
  
  return (
    <Link {...link}>
      <UiTooltip content='Apply flight sheet'>
        <IconButton variant="ghost" className='group' aria-label="Apply flight sheet">
          <ConfirmedIcon />
        </IconButton>
      </UiTooltip>
    </Link>
  )
}