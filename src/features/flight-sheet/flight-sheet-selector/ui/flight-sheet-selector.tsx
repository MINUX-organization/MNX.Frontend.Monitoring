import { FlightSheetDevicesType } from "@/entities/flight-sheet"
import { Group, Heading, Mark, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import _ from "lodash";
import { FlightSheetSelectorDeviceCard } from "./flight-sheet-selector-device-card";
import { Device, UiCheckbox, UiText } from "@/shared/ui";

export interface FlightSheetSelectorProps {
  flightSheetDevicesApplied: Set<string>;
  flightSheetDevicesSupported: FlightSheetDevicesType;
  setDevicesApplied: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function FlightSheetSelector({
  flightSheetDevicesApplied,
  flightSheetDevicesSupported,
  setDevicesApplied
}: FlightSheetSelectorProps) {
  const allGroupDeviceIds = _.flatMap(
    flightSheetDevicesSupported.elements,
    (device) => _.map(device.elements, (element) => element.id)
  );

  const currentAllChecked = allGroupDeviceIds.every(id => 
    flightSheetDevicesApplied.has(id)
  );

  const handleGroupCheckboxClick = () => {
    setDevicesApplied(prevDevices => {
      const shouldCheckAll = !allGroupDeviceIds.every(id => prevDevices.has(id));
      
      allGroupDeviceIds.forEach(id => {
        if (shouldCheckAll) 
          prevDevices.add(id) 
        else 
          prevDevices.delete(id);
      });
      
      return new Set(prevDevices);
    });
  };

  const hanldeCheckBoxClick = (deviceId: string) => {
    setDevicesApplied((prevDevices) => {
      if (prevDevices.has(deviceId)) {
        prevDevices.delete(deviceId);
      } else {
        prevDevices.add(deviceId);
      }
      return new Set(prevDevices);
    });
  };

  return (
    <Stack gap={3}>
      <Group gap={3}>
        <UiCheckbox
          colorPalette={"checked"}
          checked={currentAllChecked}
          onCheckedChange={handleGroupCheckboxClick}
        />
        <Heading>{flightSheetDevicesSupported.name}</Heading>
      </Group>
      <Stack>
        {_.map(flightSheetDevicesSupported.elements, (device) => (
          <Group key={device.name} gap={4} flexDirection={'column'} md={{ ml: 4, flexDirection: 'row' }}>
            <Heading color={'minux.solid'} alignSelf={{ base: 'flex-start', md: 'center'}}>{device.name}</Heading>
            <Wrap flex={1} gap={4}>
              {_.map(device.elements, (element) => (
                <WrapItem key={element.id} flex={1} maxW={'20rem'} >
                  <FlightSheetSelectorDeviceCard
                    flex={1}
                    h={'full'}
                    label={(
                      <Stack justify={'space-between'} minH={'5.5rem'}>
                        <UiText>{element.model}</UiText>
                        <UiText>BUS {element.pciBus}</UiText>
                        {element.flightSheetName && <UiText>Flight Sheet &nbsp; 
                          <Mark color={'minux.solid'}>{element.flightSheetName}</Mark>
                        </UiText>}
                      </Stack>
                    )}
                    device={(element.manufacturer + device.name) as Device}
                    checked={flightSheetDevicesApplied.has(element.id)}
                    onCheckedChange={() => hanldeCheckBoxClick(element.id)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Group>
        ))}
      </Stack>
    </Stack>
  )
}