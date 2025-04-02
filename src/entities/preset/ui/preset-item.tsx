import { match } from "ts-pattern"
import { PresetType } from "../model/preset.type"
import { UiContainerRounded } from "@/shared/ui"
import { DataList, Flex, Heading, Stack, Wrap, WrapItem } from "@chakra-ui/react"
import { OverclockingToDataListColumns } from "../utils/overclocking-to-data-list-columns"
import map from "lodash/map"
import { UiText } from "@/shared/ui"

interface PresetItemProps extends PresetItemVariantProps {
  type: 'card' | 'list'
}

interface PresetItemVariantProps {
  preset: PresetType
  actions?: ((item: PresetType) => React.ReactNode)[]
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
          <DataList.Root key={index} orientation={'horizontal'} gap={0} w={index === 2 ? '8rem' : '9rem'}>
            {map(column, (item, index1) => (
              <DataList.Item key={index1} gap={0}>
                <DataList.ItemLabel>
                  <UiText textStyle={'xs'}>{item.label}</UiText>
                </DataList.ItemLabel>
                <DataList.ItemValue justifyContent={'flex-end'}>
                  <UiText textStyle={'xs'}>{item.value}</UiText>
                  &nbsp;
                  <UiText color={'minux.solid'} textStyle={'xs'}>{item.unit}</UiText>
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
                    <UiText>{item.value}</UiText>
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