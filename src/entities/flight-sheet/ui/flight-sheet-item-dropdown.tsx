import { UiContainerRounded } from "@/shared/ui/container-rounded"
import { FlightSheetType } from "../model/flight-sheet.type"
import { BoxProps, DataList, Heading, Stack, StackSeparator } from "@chakra-ui/react"
import _ from "lodash"
import React from "react"

export function FLightSheetItemDropdown({
  flightSheet,
  ...props
} : {
  flightSheet: FlightSheetType
} & BoxProps) {
  const mapped = _.map(flightSheet.targets, (target) => ({
    type: target.miningConfig.$type,
    infos: _.compact([
      (target.miningConfig.$type === 'CPU') ? { label: 'Hugepages', value: target?.miningConfig?.hugePages ?? 'Not set' } : null,
      (target.miningConfig.$type === 'CPU') ? { label: 'Threads', value: target?.miningConfig?.threadsCount ?? 'Not set' } : null,
      { label: 'Additional Args', value: target?.miningConfig?.additionalArguments ?? 'Not set' },
      // { label: 'Config File Content', value: target.miningConfig.configFileContent },
    ])
  }));

  return (
    <UiContainerRounded roundedTop={'none'} bg={'bg.transparent'} overflow={'auto'} {...props}>
      <Stack separator={<StackSeparator />} direction={{ base: 'column', md: 'row'}} gap={6}>
        {_.map(mapped, (items, index) => (
          <Stack key={index} flex={1} gap={4}>
            <Heading color={'minux.solid'}>{items.type}</Heading>
            <DataList.Root key={index} orientation="horizontal">
              {_.map(items.infos, (item, index1) => (
                <DataList.Item key={index1}>
                  <DataList.ItemLabel>{item?.label}</DataList.ItemLabel>
                  <DataList.ItemValue w={'full'} textWrap={'wrap'}>{item?.value}</DataList.ItemValue>
                </DataList.Item>
              ))}
              {_.map(flightSheet.targets[index].miningConfig.coinConfigs, (coinConfig, index2) => (
                <DataList.Item key={index2}>
                  <DataList.ItemLabel>Pool password {index2 + 1}</DataList.ItemLabel>
                  <DataList.ItemValue>{coinConfig.poolPassword}</DataList.ItemValue>
                </DataList.Item>
              ))}
            </DataList.Root>
          </Stack>
        ))}
      </Stack>
    </UiContainerRounded>
  )
}