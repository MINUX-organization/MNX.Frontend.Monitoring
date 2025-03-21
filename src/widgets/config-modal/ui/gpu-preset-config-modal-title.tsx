import { GpuDynamicIndicatorsType } from "@/entities/devices/gpu";
import { HeaderSeparator, UiText } from "@/shared/ui";
import { Box, DataList, Heading, Stack } from "@chakra-ui/react";
import _ from "lodash";

export interface GpuPresetConfigModalTitleProps {
  deviceName: string
  deviceIndicators?: GpuDynamicIndicatorsType
  rigName?: string
}

export function GpuPresetConfigModelTitle({ deviceName, deviceIndicators, rigName }: GpuPresetConfigModalTitleProps) {
  const indicators = [
    { label: 'Fan Speed', value: deviceIndicators?.fanSpeed || 0, unit: '%' },
    { label: 'Power', value: deviceIndicators?.power || 0, unit: 'W' },
    { label: 'Temp. Core', value: deviceIndicators?.coreTemperature || 0, unit: '°C' },
    { label: 'Temp. Memory', value: deviceIndicators?.memoryTemperature || 0, unit: '°C' },
  ]

  return (
    <Stack gap={0}>
      <Heading>{deviceName}</Heading>
      <UiText textStyle={'xl'}>{rigName}</UiText>
      <Box>
        <HeaderSeparator fontWeight={'500'} label={'Current Indicators'} />
        <DataList.Root orientation="horizontal" gap={0}>
          {_.map(indicators, (indicator) => (
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