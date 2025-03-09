import { presetRepository } from "@/entities/preset"
import { TrashIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react"

const { usePresetMutation } = presetRepository;

export function DeletePresetButton({
  presetId
} : {
  presetId: string
}) {
  const { deletePreset } = usePresetMutation();

  const handleClick = async () => {
    await deletePreset(presetId);
  };

  return (
    <IconButton variant="ghost" className='group' aria-label="Delete preset" onClick={handleClick}>
      <TrashIcon />
    </IconButton>
  )
}