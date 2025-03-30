import { UiButton } from "@/shared/ui"
import { rigRepository } from "@/entities/rig";

const { useRigMutation } = rigRepository;

export function PowerOffButton({
  rigId
} : {
  rigId: string
}) {
  const { powerOffRig } = useRigMutation();
  const handleClick = () => powerOffRig(rigId);

  return (
    <UiButton colorPalette={'cancel'} onClick={handleClick}>
      Power Off
    </UiButton>
  )
}