import { rigRepository } from "@/entities/rig";
import { UiButton } from "@/shared/ui";

const { useRigMutation } = rigRepository;

export function StopMiningButton({
  rigId
} : {
  rigId: string
}) {
  const { stopRigMining } = useRigMutation();

  const handleClick = async () => {
    await stopRigMining(rigId);
  }

  return (
    <UiButton colorPalette={'cancel'} onClick={handleClick}>
      Stop mining
    </UiButton>
  )
}