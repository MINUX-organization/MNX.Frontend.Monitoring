import { SettingInputIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

export function GpuConfigButton({
  gpuId
} : {
  gpuId: string
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/devices/gpus/config', search: { gpuId } });
  }

  return (
    <IconButton aria-label="GPU Config" variant={'ghost'} size="xl" onClick={handleClick}>
      <SettingInputIcon />
    </IconButton>
  )
}