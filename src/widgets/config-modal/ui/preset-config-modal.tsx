/* eslint-disable react-hooks/exhaustive-deps */
import { gpuUniqueNamesOptions } from "@/entities/devices";
import { OverclockingGpuType, presetRepository } from "@/entities/preset";
import { PresetForm } from "@/features/preset";
import { presetFormStore, PresetSlidersForm } from "@/features/preset/forms";
import { UiDialog } from "@/shared/ui";
import { Box, Collapsible, Loader, Stack } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import _ from "lodash";
import { Suspense, useEffect, useMemo } from "react";

const { usePresetQuery } = presetRepository;

export function PresetConfigModal() {
  const navigate = useNavigate();
  const { presetId } = useSearch({ from: '/_guard-layout/setup/presets/config' });
  const { data: gpusUniqueNames } = useSuspenseQuery(gpuUniqueNamesOptions);
  const { setDeviceName, setMode, mode, deviceName, setOverclocking, overclocking } = presetFormStore();
  const { presets } = usePresetQuery();

  const findedPreset = useMemo(
    () =>  _.find(presets, (preset) => preset.id === presetId),
    [presetId, presets]
  );

  useEffect(() => {
    setDeviceName('');
  }, []);

  useEffect(() => {
    if (presetId) {
      setMode('edit');
    }

    if (findedPreset) {
      setDeviceName(findedPreset.deviceName);
      return;
    }
  }, [presetId, findedPreset]);

  const isOpen = !_.isEmpty(deviceName) && deviceName !== null

  return (
    <UiDialog
      open
      onOpenChange={() => {
        navigate({ to: '/setup/presets' });
      }}
      renderTitle={() => `${mode === 'edit' ? 'Edit' : 'Add'} Preset`}
      renderTrigger={() => <Box></Box>}
      renderBody={() => (
        <Stack gap={4}>
          {(findedPreset || mode === 'add') && <PresetForm
            devicesNames={gpusUniqueNames.data} 
            defaultValues={findedPreset}
            setDeviceName={setDeviceName}
            overclocking={overclocking}
            deviceNameInputDisabled={mode == 'edit'}
            onClose={() => {
              navigate({ to: '/setup/presets' })
              setDeviceName('');
            }}
            mode={mode}
          />}
          {isOpen && <Collapsible.Root open={isOpen}>
            <Collapsible.Content>
              <Suspense fallback={<Loader />}>
                <PresetSlidersForm 
                  overclockingPresetValues={findedPreset?.overclocking as OverclockingGpuType}
                  setOverclocking={setOverclocking}
                  deviceName={deviceName}
                />
              </Suspense>
            </Collapsible.Content>
          </Collapsible.Root>}
        </Stack>
      )}
    />
  )
}