/* eslint-disable @typescript-eslint/no-explicit-any */
import { UiField, UiInput, UiText } from "@/shared/ui";
import { For, Group, Stack, Tabs } from "@chakra-ui/react";
import { useState } from "react";

export function FanTabs({ 
  field,
  handleChangeValueEnd
} : { 
  field: any, 
  handleChangeValueEnd: () => void 
}) {
  const [fanType, setFanType] = useState<string | null>(field.value.$type); 

  const targetTemperatureFields = [
    {
      name: 'maxTargetSpeed',
      label: 'Max Target Speed',
      value: field.value.maxTargetSpeed,
      unit: '%'
    },
    {
      name: 'minTargetSpeed',
      label: 'Min Target Speed',
      value: field.value.minTargetSpeed,
      unit: '%'
    },
    {
      name: 'targetCoreTemperature',
      label: 'Target Core Temperature',
      value: field.value.targetCoreTemperature,
      unit: '°C'
    },
    {
      name: 'targetMemoryTemperature',
      label: 'Target Memory Temperature',
      value: field.value.targetMemoryTemperature,
      unit: '°C'
    }
  ]

  const targetSpeedFanString = 'TargetSpeed';
  const targetTemperatureFanString = 'TargetTemperature';

  return (
    <Tabs.Root 
      colorPalette={"minux"} 
      value={fanType}
      onValueChange={({ value }) => {
        field.onChange({ ...field.value, $type: value })
        setFanType(value);
      }}
    >
      <Tabs.List>
        <Tabs.Trigger value={targetSpeedFanString}>
          <UiText>Target speed</UiText>
        </Tabs.Trigger>
        <Tabs.Trigger value={targetTemperatureFanString}>
          <UiText>Target temperature</UiText>
        </Tabs.Trigger>
        <Tabs.Indicator bg={'bg.input'} rounded="l2" />
      </Tabs.List>
        <Tabs.Content value={targetSpeedFanString}>
          <UiField label={'Target speed'} orientation="horizontal" labelprops={{ flex: 1 }}>
            <Group>
              <UiInput
                w={'80px'}
                h={'28px'}
                textAlign="right"
                name={field.name}
                value={field.value.targetSpeed}
                onChange={(e) => {
                  const number = Number(e.target.value);

                  if (Number.isNaN(number)) return;

                  field.onChange({
                    ...field.value,
                    targetSpeed: number,
                    $type: targetSpeedFanString
                  })
                  handleChangeValueEnd();
                }}
              />
              <UiText w={8} textAlign="right">{'%'}</UiText>
            </Group>
          </UiField>
        </Tabs.Content>
        <Tabs.Content value={targetTemperatureFanString}>
          <Stack gap={4}>
            <For each={targetTemperatureFields}>
              {(item) => (
                <UiField key={item.name} label={item.label} orientation="horizontal" labelprops={{ flex: 1 }}>
                  <Group>
                    <UiInput
                      w={'80px'}
                      h={'28px'}
                      textAlign="right"
                      name={field.name}
                      value={item.value}
                      onChange={(e) => {
                        const number = Number(e.target.value);

                        if (Number.isNaN(number)) return;

                        field.onChange({
                          ...field.value,
                          [item.name]: number,
                          $type: targetTemperatureFanString
                        })
                        handleChangeValueEnd();
                      }}
                    />
                    <UiText w={8} textAlign="right">{item.unit}</UiText>
                  </Group>
                </UiField>
              )}
            </For>
          </Stack>
        </Tabs.Content>
    </Tabs.Root>
  )
}