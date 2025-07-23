import { match } from "ts-pattern"
import { PresetType } from "../model/preset.type"
import { UiContainerRounded, UiToggleTip } from "@/shared/ui"
import { Clipboard, DataList, Flex, Group, Heading, IconButton, Stack, Wrap, WrapItem } from "@chakra-ui/react"
import { OverclockingToDataListColumns } from "../utils/overclocking-to-data-list-columns"
import map from "lodash/map"
import { UiText } from "@/shared/ui"
import { FaEye } from "react-icons/fa"

interface PresetItemProps extends PresetItemVariantProps {
  type: 'card' | 'list'
}

interface PresetItemVariantProps {
  preset: PresetType
  actions?: ((item: PresetType) => React.ReactNode)[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FanToolTip = ({ item }: { item: any }) => {
  return (
    <DataList.Root orientation="horizontal" p={2}>
      {match(item.value.$type)
      .with('TargetSpeed', () => (
          <DataList.Item>
            <DataList.ItemLabel>Target Speed</DataList.ItemLabel>
            <DataList.ItemValue justifyContent={'flex-end'}>
              {item.value.targetSpeed}&nbsp;{'%'}
            </DataList.ItemValue>
          </DataList.Item>
      ))
      .with('TargetTemperature', () => (
        <>
          <DataList.Item>
            <DataList.ItemLabel>Max Target Speed</DataList.ItemLabel>
            <DataList.ItemValue justifyContent={'flex-end'}>
              {item.value.maxTargetSpeed}&nbsp;{'%'}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Min Target Speed</DataList.ItemLabel>
            <DataList.ItemValue justifyContent={'flex-end'}>
              {item.value.minTargetSpeed}&nbsp;{'%'}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Target Core Temp.</DataList.ItemLabel>
            <DataList.ItemValue justifyContent={'flex-end'}>
              {item.value.targetCoreTemperature}&nbsp;{'°C'}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Target Mem. Temp.</DataList.ItemLabel>
            <DataList.ItemValue justifyContent={'flex-end'}>
              {item.value.targetMemoryTemperature}&nbsp;{'°C'}
            </DataList.ItemValue>
          </DataList.Item>
        </>
      ))
      .with('LinearDependence', () => 'LinearDependence')
      .otherwise(() => item.value.$type)}
    </DataList.Root>
  )
}

export function PresetItem({ type, preset, actions }: PresetItemProps) {
  return (
    <>
      {match(type)
        .with('card', () => <PresetItemCard preset={preset} actions={actions} />)
        .with('list', () => <PresetItemList preset={preset} actions={actions} />)
        .exhaustive()
      }
    </>
  )
}

export function PresetItemCard({ preset, actions }: PresetItemVariantProps) {
  const columns = OverclockingToDataListColumns(preset.overclocking)

  return (
    <UiContainerRounded p={4}>
      <Stack direction={'row'} justify={'space-between'} alignItems={'center'}>
        <Stack direction={'column'} gap={0}>
          <UiText textStyle={'xl'}>{preset.name}</UiText>
          <UiText color={'gray.400'}> - {preset.deviceName}</UiText>
        </Stack>
        {actions && <Wrap>
          {map(actions, (action, index) => (
            <WrapItem key={index}>
              {action(preset)}
            </WrapItem>
          ))}
        </Wrap>}
      </Stack>
      <Flex gap={2} mt={2}>
        {map(columns, (column, index) => (
          <DataList.Root key={index} orientation={'horizontal'} gap={1.5} w={index === 2 ? '8rem' : '9rem'}>
            {map(column, (item, index1) => (
              <DataList.Item key={index1} gap={0}>
                <DataList.ItemLabel>
                  <UiText textStyle={'xs'}>{item.label}</UiText>
                </DataList.ItemLabel>
                <DataList.ItemValue justifyContent={'flex-end'}>
                  <Group gap={1}>
                    {match(item.type)
                      .with('fanSpeed', () => (
                        <UiToggleTip content={<FanToolTip item={item} />}>
                          <UiText cursor={'pointer'} textStyle={'xs'} textWrap={'nowrap'}>
                            {match(item.value.$type)
                              .with('TargetSpeed', () => 'Target Speed')
                              .with('TargetTemperature', () => 'Target Temp.')
                              .with('LinearDependence', () => 'Graphic')
                              .otherwise(() => item.value.$type)}
                          </UiText>
                        </UiToggleTip>
                      ))
                      .with('memTweak', () => (
                        <Group gap={1}>
                          <Clipboard.Root value={item.value}>
                            <Clipboard.Trigger asChild>
                              <IconButton variant="ghost" size={'xs'}>
                                <Clipboard.Indicator />
                              </IconButton>
                            </Clipboard.Trigger>
                          </Clipboard.Root>
                          <UiToggleTip content={<UiText>{item.value}</UiText>}>
                            <IconButton variant="ghost" size={'xs'}>
                              <FaEye />
                            </IconButton>
                          </UiToggleTip> 
                        </Group> 
                      ))
                      .otherwise(() => (
                        <UiText textStyle={'xs'}>{item.value}</UiText>
                      ))
                    }
                    <UiText color={'minux.solid'} textStyle={'xs'}>{item.unit}</UiText>
                  </Group>
                </DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        ))}
      </Flex>
    </UiContainerRounded>
  )
}

export function PresetItemList({ preset, actions }: PresetItemVariantProps) {
  const columns = OverclockingToDataListColumns(preset.overclocking)

  return (
    <Flex 
      gap={4} 
      justify={'space-between'} 
      direction={{ base: 'column', lg: 'row'}} 
      alignItems={{ base: 'flex-start', lg: 'center'}}
    >
      <Heading w={{ base: 'full', lg: '15rem'}} truncate>{preset.name}</Heading>
      <Wrap gap={4}>
        {map(columns, (column, index) => (
          <WrapItem key={index} flex={1}>
            <DataList.Root orientation={'horizontal'} gap={0} w={{ base: '11.75rem', md: '14rem'}}>
              {map(column, (item, index1) => (
                <DataList.Item key={index1}>
                  <DataList.ItemLabel>
                    <UiText>{item.label}</UiText>
                  </DataList.ItemLabel>
                  <DataList.ItemValue justifyContent={'flex-end'}>
                    {match(item.type)
                      .with('fanSpeed', () => (
                        <UiToggleTip content={<FanToolTip item={item} />}>
                          <UiText cursor={'pointer'} textWrap={'nowrap'}>
                            {match(item.value.$type)
                              .with('TargetSpeed', () => 'Target Speed')
                              .with('TargetTemperature', () => 'Target Temp.')
                              .with('LinearDependence', () => 'Graphic')
                              .otherwise(() => item.value.$type)}
                          </UiText>
                        </UiToggleTip>
                      ))
                      .with('memTweak', () => (
                        <Group gap={1}>
                          <Clipboard.Root value={item.value}>
                            <Clipboard.Trigger asChild>
                              <IconButton variant="ghost" size={'sm'}>
                                <Clipboard.Indicator />
                              </IconButton>
                            </Clipboard.Trigger>
                          </Clipboard.Root>
                          <UiToggleTip content={<UiText>{item.value}</UiText>}>
                            <IconButton variant="ghost" size={'sm'}>
                              <FaEye />
                            </IconButton>
                          </UiToggleTip> 
                        </Group> 
                      ))
                      .otherwise(() => (
                        <UiText>{item.value}</UiText>
                      ))
                    }
                    &nbsp;
                    <UiText color={'minux.solid'}>{item.unit}</UiText>
                  </DataList.ItemValue>
                </DataList.Item>
              ))}
            </DataList.Root>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap justify={'center'}>
        {map(actions, (action, index) => (
          <WrapItem key={index}>
            {action(preset)}
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}