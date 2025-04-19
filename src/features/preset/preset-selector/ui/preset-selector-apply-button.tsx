import { presetRepository } from "@/entities/preset";
import { UiButton } from "@/shared/ui";

const { usePresetMutation } = presetRepository;

export function PresetSelectorApplyButton({
  presetId,
  devicesIds
} : {
  presetId: string
  devicesIds: string[]
}) {
  const { applyPresetDevices } = usePresetMutation();
  
  const handleClick = async () => {
    await applyPresetDevices({id: presetId, data: devicesIds});
  }

  return (
    <UiButton
      colorPalette={'accept'}
      onClick={handleClick}
    >
      Apply
    </UiButton>
  )
}