import { UiButton } from "@/shared/ui";
import { presetFormStore } from "../preset/forms";
import { gpuRepository } from "@/entities/devices/gpu";

const { useGpuMutation } = gpuRepository;

export function ApplyOverclockingButton({
  deviceId
} : {
  deviceId: string;
}) {
  const { setOverclocking } = useGpuMutation();
  const { overclocking } = presetFormStore();

  const handleClick = () => {
    if (!overclocking) return;

    setOverclocking({ data: { ...overclocking}, id: deviceId })
  };

  return (
    <UiButton colorPalette={'accept'} onClick={handleClick}>
      Confirm
    </UiButton>
  )
}