/* eslint-disable react-hooks/exhaustive-deps */
import { gpuOverclockingOptions, gpuRepository } from "@/entities/devices/gpu";
import { presetFormStore, PresetSlidersForm } from "@/features/preset/forms";
import { UiDialog } from "@/shared/ui";
import { Box, Group, Loader } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense, useEffect, useMemo } from "react";
import { GpuPresetConfigModelTitle } from "./gpu-preset-config-modal-title";
import { ApplyOverclockingButton } from "@/features/devices";
import { SaveAsPresetButton, ApplyPresetFromListButton } from "@/features/preset";
import { PresetsList } from "./presets-list";

const { useGpuQuery } = gpuRepository;

export function GpuPresetConfigModal() {
  const navigate = useNavigate();
  const { gpuId } = useSearch({ from: '/_guard-layout/devices/gpus/config' });
  const { getById } = useGpuQuery();
  const { setDeviceName, deviceName, setOverclocking } = presetFormStore();
  const findedGpu = useMemo(
    () => getById(gpuId),
    [gpuId]
  );
  const { data: currentGpuOverclocking } = useQuery(gpuOverclockingOptions(gpuId));

  useEffect(() => {
    if (findedGpu) {
      setDeviceName(findedGpu.information.name);
    }
  }, [findedGpu]);

  return (
    <UiDialog
      open
      onOpenChange={() => {
        navigate({ to: '/devices/gpus' });
      }}
      renderTitle={() => (
        <GpuPresetConfigModelTitle deviceName={deviceName} rigName={findedGpu?.rigName} />
      )}
      renderTrigger={() => <Box></Box>}
      renderBody={() => {
        return deviceName && currentGpuOverclocking?.data && (
          <Suspense fallback={<Loader />}>
              <PresetSlidersForm
                overclockingPresetValues={currentGpuOverclocking.data}
                setOverclocking={setOverclocking}
                deviceName={deviceName}
              />
          </Suspense>
        )
      }}
      renderFooter={() => (
        <Group w={'full'} justifyContent={'space-between'}>
          <ApplyPresetFromListButton renderPresetsList={() => (
            <Suspense fallback={<Loader />}>
              <PresetsList deviceName={deviceName} />
            </Suspense>
          )} />
          <Group>
            <SaveAsPresetButton />
            <ApplyOverclockingButton deviceId={gpuId} />
          </Group>
        </Group>
      )}
    />
  )
}