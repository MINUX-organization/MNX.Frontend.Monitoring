import { ActiveIndicator, UiContainerRounded, UiText } from "@/shared/ui";
import { DataList, Group, Heading, Stack, StackProps, VStack, Wrap } from "@chakra-ui/react";
import { GpuType } from "../model/gpu.type";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { GpuDynamicIndicatorsType } from "..";
import { GpuItemTable } from "./gpu-item-table";

interface GpuItemProps extends StackProps {
  gpu: GpuType;
  gpuDynamic?: GpuDynamicIndicatorsType;
  renderGpuSetting?: (gpuId: string) => React.ReactNode
}

export function GpuItem({ gpu, gpuDynamic, renderGpuSetting, ...props }: GpuItemProps) {
  const gpuIndicators = [
    { label: 'MEM', value: gpuDynamic?.memoryTemperature || 0, unit: '°C' },
    { label: 'CORE' , value: gpuDynamic?.coreTemperature || 0, unit: '°C' },
    { label: 'FAN', value: gpuDynamic?.fanSpeed || 0, unit: '%' },
    { label: 'PWR', value: gpuDynamic?.power || 0, unit: 'W' },
  ];

  const stats = [
    { label: 'Preset', value: gpu.presetName },
    { label: 'Flight sheet', value: gpu.flightSheetName },
    { label: 'Rig', value: gpu.rigName },
  ];

  return (
    <UiContainerRounded 
        flexDirection={{ base: 'column', md: 'row'}} 
        display={'flex'}
        gap={4}
        alignItems={{ base: 'flex-start', md: 'center'}}
        justifyContent={{ base: 'flex-start', md: 'space-between'}}
        {...props}
      >
        <Stack gap={0}>
          <Group>
            <ActiveIndicator activeState={gpuDynamic?.miningState} isOnline={gpu.isOnline} />
            <Heading w={{ base: '100%', md: '20rem'}}>{gpu.information.name}</Heading>
          </Group>
          <DataList.Root orientation="horizontal" gap={0}>
            {map(stats, (stat) => (
              <DataList.Item key={stat.label}>
                <DataList.ItemLabel minW={'5rem'}>{stat.label}</DataList.ItemLabel>
                <DataList.ItemValue color={'minux.solid'}>{stat.value ?? '-'}</DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        </Stack>
        <Wrap>
          {map(gpuIndicators, (indicator) => (
            <VStack key={indicator.label} gap={0}>
              <UiText w={16} textAlign={'center'} bg={'bg.transparent'} color={'gray.400'}>
                {indicator.label}
              </UiText>
              <Group gap={1}>
                <UiText>{indicator.value}</UiText>
                <UiText display={'inline'} color={'minux.solid'}>{indicator.unit}</UiText>
              </Group>
            </VStack>
          ))}
        </Wrap>
        {!isEmpty(gpuDynamic?.flightSheet.coins) && 
          <GpuItemTable coins={gpuDynamic?.flightSheet.coins || []} power={gpuDynamic?.power || 0} />}
        <Group>
          {renderGpuSetting?.(gpu.id)}
        </Group>
    </UiContainerRounded>
  )
}