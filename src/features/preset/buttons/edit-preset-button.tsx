import { EditIcon } from "@/shared/assets/svg";
import { UiDialog } from "@/shared/ui";
import { Center, IconButton, Spinner, Stack } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";
import { PresetForm, PresetSlidersForm } from "../forms";
import { OverclockingGpuType, presetByIdQueryOptions } from "@/entities/preset";
import { Suspense, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
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
      renderBody={(onClose) => (
        <Suspense fallback={<Center><Spinner /></Center>}>
          <EditPresetWrapperForm 
            presetId={presetId} 
            onClose={onClose} 
            deviceNameProp={deviceName}
          />
        </Suspense>
      )}/>
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
  deviceNameProp,
}: { 
  presetId: string, 
  onClose?: () => void,
  deviceNameProp?: string
}) => {
  const { data: presetData } = useSuspenseQuery(presetByIdQueryOptions(presetId));
  const [deviceName, setDeviceName] = useState('');
  const [overclocking, setOverclocking] = useState<Omit<OverclockingGpuType, '$type'> | null>(null);
  const { data: gpusUniqueNames } = useQuery(gpuUniqueNamesOptions);

  const preset = presetData.data;

  const isOpen = !isEmpty(deviceName) && deviceName !== null

  useEffect(() => {
    if (preset) {
      setDeviceName(preset.deviceName);
    }
  }, [preset]);

  return (
    <Stack>
      <PresetForm 
        devicesNames={gpusUniqueNames?.data}
        defaultValues={preset}
        overclocking={overclocking}
        setDeviceName={setDeviceName}
        deviceNameInputDisabled
        mode="edit"
        onClose={onClose}
      />
      {isOpen && <PresetSlidersForm 
        overclockingPresetValues={preset.overclocking as OverclockingGpuType}
        setOverclocking={setOverclocking}
        deviceIdOrName={deviceNameProp}
      />}
    </Stack>
  )
}