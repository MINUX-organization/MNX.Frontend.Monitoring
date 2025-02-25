import { flightSheetByIdQueryOptions, FlightSheetDevicesType, flightSheetRigDevicesQueryOptions, flightSheetRigDevicesSupportQueryOptions } from "@/entities/flight-sheet"
import { FlightSheetSelector, FlightSheetSelectorApplyButton } from "@/features/flight-sheet";
import { UiText } from "@/shared/ui";
import { UiContainerRounded } from "@/shared/ui/container-rounded";
import { GenericList } from "@/widgets/generic-list";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import { useSuspenseQueries } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table";
import _ from "lodash";
import { useEffect, useState } from "react";

export function FlightSheetApplyPage() {
  const { flightSheetId } = useParams({ strict: false });
  const [devicesAppliedIds, setDevicesAppliedIds] = useState<Set<string>>(new Set());
  const [
    { data: flightSheetData }, 
    { data: flightSheetRigDevicesData }, 
    { data: flightSheetRigDevicesSupportData }
  ] = useSuspenseQueries({
    queries: [
      flightSheetByIdQueryOptions(flightSheetId),
      flightSheetRigDevicesQueryOptions(flightSheetId),
      flightSheetRigDevicesSupportQueryOptions(flightSheetId),
    ] 
  })

  const flightSheet = flightSheetData.data;

  const flightSheetRigsColumns: ColumnDef<FlightSheetDevicesType>[] = [
    { accessorKey: 'name', header: 'By Rig' },
  ]

  useEffect(() => {
    const ids: Set<string> = new Set();

    _.forEach(flightSheetRigDevicesData.data, (device) => 
      _.forEach(device.elements, (element) => 
        _.forEach(element.elements, (device) => ids.add(device.id))))

    setDevicesAppliedIds(ids)
  }, [flightSheetRigDevicesData.data])

  return (
    <Stack gap={4}> 
      <VStack>
        <Heading color={'minux.solid'}>{flightSheet.name}</Heading>
        <UiText textStyle={'lg'}>Apply flight sheet for devices</UiText>
      </VStack>
      <GenericList 
        data={flightSheetRigDevicesSupportData.data}
        columns={flightSheetRigsColumns}
        searchable
        sortable
        renderAddButton={() => 
          <FlightSheetSelectorApplyButton flightSheetId={flightSheetId} devicesIds={Array.from(devicesAppliedIds)}/>}
        renderItem={(item) => 
          <UiContainerRounded bg={'bg.panel'}>
              <FlightSheetSelector
                flightSheetDevicesSupported={item}
                flightSheetDevicesApplied={devicesAppliedIds}
                setDevicesApplied={setDevicesAppliedIds}
              /> 
          </UiContainerRounded>
        }
      />
    </Stack>
  )
}