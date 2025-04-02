import { 
  presetByIdQueryOptions, 
  PresetDevicesType, 
  presetRigDevicesQueryOptions, 
  presetRigDevicesSupportQueryOptions 
} from "@/entities/preset";
import { PresetSelector, PresetSelectorApplyButton } from "@/features/preset/preset-selector";
import { UiText } from "@/shared/ui";
import { UiContainerRounded } from "@/shared/ui";
import { GenericList } from "@/widgets/generic-list";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import { useSuspenseQueries } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import forEach from "lodash/forEach";

export function PresetApplyPage() {
  const { presetId } = useParams({ strict: false });
  const [devicesAppliedIds, setDevicesAppliedIds] = useState<Set<string>>(new Set());
  const [
    { data: presetData }, 
    { data: presetRigDevicesData }, 
    { data: presetRigDevicesSupportData }
  ] = useSuspenseQueries({
    queries: [
      presetByIdQueryOptions(presetId),
      presetRigDevicesQueryOptions(presetId),
      presetRigDevicesSupportQueryOptions(presetId),
    ] 
  })

  const preset = presetData.data;

  const flightSheetRigsColumns: ColumnDef<PresetDevicesType>[] = [
    { accessorKey: 'name', header: 'By Rig' },
  ]

  useEffect(() => {
    const ids: Set<string> = new Set();

    forEach(presetRigDevicesData.data, (device) => 
      forEach(device.elements, (element) => 
        forEach(element.elements, (device) => ids.add(device.id))))

    setDevicesAppliedIds(ids)
  }, [presetRigDevicesData.data])

  return (
    <Stack gap={4}> 
      <VStack>
        <Heading color={'minux.solid'}>{preset.name}</Heading>
        <UiText textStyle={'lg'}>Apply preset for devices</UiText>
      </VStack>
      <GenericList 
        data={presetRigDevicesSupportData.data}
        columns={flightSheetRigsColumns}
        searchable
        sortable
        renderAddButton={() => 
          <PresetSelectorApplyButton presetId={presetId} devicesIds={Array.from(devicesAppliedIds)}/>}
        renderItem={(item) => 
          <UiContainerRounded bg={'bg.panel'}>
              <PresetSelector
                presetDevicesSupported={item}
                presetDevicesApplied={devicesAppliedIds}
                setDevicesApplied={setDevicesAppliedIds}
              />
          </UiContainerRounded>
        }
      />
    </Stack>
  )
}