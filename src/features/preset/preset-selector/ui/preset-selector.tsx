import { Group, Heading, Mark, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import _ from "lodash";
import { Device, UiCheckbox, UiText } from "@/shared/ui";
import { PresetDevicesType } from "@/entities/preset";
import { PresetSelectorDeviceCard } from "./preset-selector-device-card";

export interface PresetSelectorProps {
  presetDevicesApplied: Set<string>;
  presetDevicesSupported: PresetDevicesType;
  setDevicesApplied: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function PresetSelector({
  presetDevicesApplied,
  presetDevicesSupported,
  setDevicesApplied,
}: PresetSelectorProps) {
  const allGroupDeviceIds = _.flatMap(
    presetDevicesSupported.elements,
    (device) => _.map(device.elements, (element) => element.id)
  );

  const currentAllChecked = allGroupDeviceIds.every(id => 
    presetDevicesApplied.has(id)
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
          colorPalette={"minux"}
          checked={currentAllChecked}
          onCheckedChange={handleGroupCheckboxClick}
        />
        <Heading>{presetDevicesSupported.name}</Heading>
      </Group>
      <Stack>
        {_.map(presetDevicesSupported.elements, (device) => (
          <Group key={device.name} gap={4} flexDirection={'column'} md={{ ml: 4, flexDirection: 'row' }}>
            <Heading color={'minux.solid'} alignSelf={{ base: 'flex-start', md: 'center'}}>{device.name}</Heading>
            <Wrap flex={1} gap={4}>
              {_.map(device.elements, (element) => (
                <WrapItem key={element.id} flex={1} maxW={'20rem'} >
                  <PresetSelectorDeviceCard
                    flex={1}
                    h={'full'}
                    label={(
                      <Stack justify={'space-between'} minH={'5.5rem'}>
                        <UiText>{element.model}</UiText>
                        <UiText>BUS {element.pciBus}</UiText>
                        {element.presetName && <UiText>Preset &nbsp; 
                          <Mark color={'minux.solid'}>{element.presetName}</Mark>
                        </UiText>}
                      </Stack>
                    )}
                    device={(element.manufacturer + device.name) as Device}
                    checked={presetDevicesApplied.has(element.id)}
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