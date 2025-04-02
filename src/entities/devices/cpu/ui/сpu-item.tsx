import { ActiveIndicator, UiContainerRounded, UiText } from "@/shared/ui";
import { DataList, Group, Heading, Stack, StackProps, VStack, Wrap } from "@chakra-ui/react";
import _ from "lodash";
import { CpuDynamicIndicatorsType } from "..";
import { CpuItemTable } from "./сpu-item-table";
import { CpuType } from "../model/cpu.type";

interface CpuItemProps extends StackProps {
  cpu: CpuType;
  cpuDynamic?: CpuDynamicIndicatorsType;
}

export function CpuItem({ cpu, cpuDynamic, ...props }: CpuItemProps) {
  const gpuIndicators = [
    { label: 'TMP', value: cpuDynamic?.temperature || 0, unit: '°C' },
    { label: 'FAN', value: cpuDynamic?.fanSpeed || 0, unit: '%' },
    { label: 'PWR', value: cpuDynamic?.power || 0, unit: 'W' },
  ];

  const stats = [
    { label: 'Preset', value: cpu.presetName },
    { label: 'Flight sheet', value: cpu.flightSheetName },
    { label: 'Rig', value: cpu.rigName },
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
            <ActiveIndicator activeState={cpuDynamic?.miningState} isOnline={cpu?.isOnline} />
            <Heading w={{ base: '100%', md: '20rem'}}>{cpu.information.name}</Heading>
          </Group>
          <DataList.Root orientation="horizontal" gap={0}>
            {_.map(stats, (stat) => (
              <DataList.Item key={stat.label}>
                <DataList.ItemLabel minW={'5rem'}>{stat.label}</DataList.ItemLabel>
                <DataList.ItemValue color={'minux.solid'}>{stat.value ?? '-'}</DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        </Stack>
        <Wrap>
          {_.map(gpuIndicators, (indicator) => (
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
        {!_.isEmpty(cpuDynamic?.flightSheet.coins) && 
          <CpuItemTable coins={cpuDynamic?.flightSheet.coins || []} power={cpuDynamic?.power || 0} />}
        <Group>
        </Group>
    </UiContainerRounded>
  )
}