import { GpuDynamicIndicatorsType } from "@/entities/devices/gpu";
import { HeaderSeparator, UiText } from "@/shared/ui";
import { Box, DataList, Heading, Stack } from "@chakra-ui/react";
import map from "lodash/map";

export interface GpuPresetConfigModalTitleProps {
  deviceName: string
  dynamicDeviceIndicators?: GpuDynamicIndicatorsType
  rigName?: string
}

export function GpuPresetConfigModelTitle({ deviceName, dynamicDeviceIndicators, rigName }: GpuPresetConfigModalTitleProps) {
  const indicators = [
    { label: 'Fan Speed', value: dynamicDeviceIndicators?.fanSpeed || 0, unit: '%' },
    { label: 'Power', value: dynamicDeviceIndicators?.power || 0, unit: 'W' },
    { label: 'Temp. Core', value: dynamicDeviceIndicators?.coreTemperature || 0, unit: '°C' },
    { label: 'Temp. Memory', value: dynamicDeviceIndicators?.memoryTemperature || 0, unit: '°C' },
  ]

  return (
    <Stack gap={0}>
      <Heading>{deviceName}</Heading>
      <UiText textStyle={'xl'}>{rigName}</UiText>
      <Box>
        <HeaderSeparator fontWeight={'500'} label={'Current Indicators'} />
        <DataList.Root orientation="horizontal" gap={0}>
          {map(indicators, (indicator) => (
            <DataList.Item key={indicator.label}>
              <DataList.ItemLabel>
                <UiText>{indicator.label}</UiText>
              </DataList.ItemLabel>
              <DataList.ItemValue justifyContent={'flex-end'}>
                <UiText>{indicator.value}</UiText>
                &nbsp;
                <UiText color={'minux.solid'}>{indicator.unit}</UiText>
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Box>
    </Stack>
  )
}