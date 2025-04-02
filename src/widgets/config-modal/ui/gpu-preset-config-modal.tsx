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
import { devicesStreamStore } from "@/entities/devices";
import isEmpty from "lodash/isEmpty";

const { useGpuQuery } = gpuRepository;

export function GpuPresetConfigModal() {
  const navigate = useNavigate();
  const { gpuDynamicTotalIndicators } = devicesStreamStore();
  const { gpuId } = useSearch({ from: '/_guard-layout/_notification/_streams/devices/gpus/config' });
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
    return () => {
      setDeviceName('');
    }
  }, [findedGpu]);

  return (
    <UiDialog
      open
      onOpenChange={() => {
        navigate({ to: '/devices/gpus' });
      }}
      renderTitle={() => (
        <GpuPresetConfigModelTitle 
          deviceName={deviceName}
          dynamicDeviceIndicators={gpuDynamicTotalIndicators.get(gpuId)}
          rigName={findedGpu?.rigName} />
      )}
      renderTrigger={() => <Box></Box>}
      renderBody={() => {
        return !isEmpty(deviceName) && currentGpuOverclocking?.data && (
          <Suspense fallback={<Loader />}>
              <PresetSlidersForm
                overclockingPresetValues={currentGpuOverclocking.data}
                setOverclocking={setOverclocking}
                deviceIdOrName={gpuId}
              />
          </Suspense>
        )
      }}
      renderFooter={() => (
        <Group w={'full'} justifyContent={'space-between'}>
          <ApplyPresetFromListButton renderPresetsList={() => (
            <Suspense fallback={<Loader />}>
              <PresetsList deviceName={deviceName} deviceId={gpuId} />
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