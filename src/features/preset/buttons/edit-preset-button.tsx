import { EditIcon } from "@/shared/assets/svg";
import { UiDialog } from "@/shared/ui";
import { IconButton, Stack } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";
import { PresetForm, PresetSlidersForm } from "../forms";
import { OverclockingGpuType, presetsByDeviceNameQueryOptions } from "@/entities/preset";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { gpuUniqueNamesOptions } from "@/entities/devices";

export function EditPresetButton({
  presetId,
  deviceName,
  type = 'link'
} : {
  presetId: string
  deviceName?: string
  type?: 'action' | 'link'
}) {
  if (type === 'action') return (
    <UiDialog
      lazyMount
      renderTitle={() => "Edit preset"}
      renderTrigger={() => (
        <IconButton variant="ghost" className='group' aria-label="Edit preset">
          <EditIcon />
        </IconButton>
      )}
      renderBody={(onClose) => <EditPresetWrapperForm 
        presetId={presetId} 
        onClose={onClose} 
        deviceNameProp={deviceName}/>}
    />
  )

  const link = linkOptions({
    to: '/setup/presets/config',
    search: { presetId }
  })

  return (
    <Link {...link}>
      <IconButton variant="ghost" className='group' aria-label="Edit preset">
        <EditIcon />
      </IconButton>
    </Link>
  )
}

export const EditPresetWrapperForm = ({ 
  presetId, 
  onClose, 
  deviceNameProp
}: { 
  presetId: string, 
  onClose?: () => void,
  deviceNameProp?: string
}) => {
  const { data: presets } = useSuspenseQuery(presetsByDeviceNameQueryOptions(deviceNameProp));
  const [deviceName, setDeviceName] = useState('');
  const [overclocking, setOverclocking] = useState<Omit<OverclockingGpuType, '$type'> | null>(null);
  const { data: gpusUniqueNames } = useQuery(gpuUniqueNamesOptions);

  const findedPreset = useMemo(
    () =>  _.find(presets.data, (preset) => preset.id === presetId),
    [presets.data, presetId]
  )

  const isOpen = !_.isEmpty(deviceName) && deviceName !== null

  useEffect(() => {
    if (findedPreset) {
      setDeviceName(findedPreset.deviceName);
    }
  }, [findedPreset]);

  return (
    <Stack>
      <PresetForm 
        devicesNames={gpusUniqueNames?.data}
        defaultValues={findedPreset}
        overclocking={overclocking}
        setDeviceName={setDeviceName}
        mode="edit"
        onClose={onClose}
      />
      {isOpen && <PresetSlidersForm 
        overclockingPresetValues={findedPreset?.overclocking as OverclockingGpuType}
        setOverclocking={setOverclocking}
        deviceName={deviceName}
      />}
    </Stack>
  )
}