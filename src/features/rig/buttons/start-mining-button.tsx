import { rigRepository } from "@/entities/rig";
import { UiButton } from "@/shared/ui";

const { useRigMutation } = rigRepository;

export function StartMiningButton({
  rigId
} : {
  rigId: string
}) {
  const { startRigMining } = useRigMutation();

  const handleClick = async () => {
    await startRigMining(rigId);
  }

  return (
    <UiButton colorPalette={'accept'} onClick={handleClick}>
      Start mining
    </UiButton>
  )
}