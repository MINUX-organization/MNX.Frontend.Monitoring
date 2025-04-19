import { UiButton } from "@/shared/ui";
import { rigRepository } from "@/entities/rig";

const { useRigMutation } = rigRepository;

export function RebootButton({
  rigId
} : {
  rigId: string
}) {
  const { rebootRig } = useRigMutation();

  const handleClick = () => rebootRig(rigId);

  return (
    <UiButton colorPalette={'cancel'} onClick={handleClick}>
      Reboot
    </UiButton>
  )
}