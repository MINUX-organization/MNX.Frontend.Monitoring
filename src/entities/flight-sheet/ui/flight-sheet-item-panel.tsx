import { UiContainerRounded } from "@/shared/ui";
import { Box, Flex, Grid, GridItem, Group, Heading, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { FlightSheetType } from "..";
import { Device, DevicesIcons, UiText } from "@/shared/ui";
import map from "lodash/map";
import flatMap from "lodash/flatMap";
import orderBy from "lodash/orderBy";
import React from "react";

export interface FlightSheetItemPanelProps {
  state: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }
  flightSheet: FlightSheetType;
  renderActions?: ((id: string) => React.ReactNode)[];
  renderOpenButton?: () => React.ReactNode
}

export function FlightSheetItemPanel({ state, flightSheet, renderActions, renderOpenButton }: FlightSheetItemPanelProps) {
  const coinConfigs = flatMap(flightSheet.targets, (target) => 
    map(target.miningConfig.coinConfigs, (coinConfig) => ({
      type: target.miningConfig.$type,
      cryptocurrency: coinConfig.pool.cryptocurrency,
      pool: coinConfig.pool.domain,
      wallet: coinConfig.wallet.name,
    })));

  const miners = map(flightSheet.targets, (target) => ({
    type: target.miningConfig.$type,
    ...target.miner,
  }));

  const minersSortedByType = orderBy(miners, ['type'], ['desc']);
  const coinConfigsSortedByType = orderBy(coinConfigs, ['type'], ['desc']);

  return (
    <UiContainerRounded 
      roundedBottom={state.isOpen ? 'none' : 'md'} 
      borderBottomColor={state.isOpen ? 'transparent' : 'minux.solid'}
      minH={'12rem'} 

      bg={'bg.transparent'}
      position={'relative'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Grid templateColumns={'1fr auto auto'} templateRows={'auto 1fr'} h={'full'} flex={1}>
        <GridItem colSpan={2}>
          <Heading w={'full'} truncate >{flightSheet.name}</Heading>
        </GridItem>
        <GridItem colSpan={2} rowSpan={2}>
          <Flex wrap={'wrap-reverse'} h={'full'} alignItems={'center'} gap={4}>
            <Stack         
              direction={'row'} 
            >             
              <Flex gap={2} direction={'column'} justifySelf={'flex-end'}>
                {map(minersSortedByType, (miner, index) => (
                  <Stack key={miner.type + index} gap={1}>  
                    <Group>
                      <UiText color={'minux.solid'} mr={2}>{miner.type} miner</UiText>
                      <UiText truncate>{miner.name}</UiText>
                    </Group>
                    <DevicesIcons devices={miner.supportedDevices as Device[]} />
                  </Stack>
                ))}   
              </Flex>
            </Stack>
            <Flex flex={1} justify={'center'} css={{ '@media screen and (max-width: 1310px)': { justifyContent: 'flex-start' }}}>
              <Grid 
                templateColumns={{ base: '1fr 1fr', md: 'auto  repeat(3, auto)'}} 
                templateRows={{ base: 'repeat(4, auto)', md: '1fr'}}
                display={{ base: 'flex', md: 'grid'}}
                flexWrap={'wrap'}
                gap={2}
              >
                {map(coinConfigsSortedByType, (coinConfig, index) => {
                  const isCpu = coinConfig.type === 'CPU';
                  const indexAdded = index + 1;
                  return (
                    <Grid 
                      key={coinConfig.cryptocurrency + coinConfig.type}
                      gridColumn={{ base: 1, md: '1 / 5'}}
                      gap={4}
                      alignItems={'center'}
                      gridTemplateColumns={'subgrid'}
                    >
                      <UiText color={'minux.solid'}>{coinConfig.type}</UiText>
                      <Group>
                        <UiText color={'gray.400'}>Coin{!isCpu && `-${indexAdded}`}</UiText> 
                        <UiText>{coinConfig.cryptocurrency}</UiText>
                      </Group>
                      <Group>
                        <UiText color={'gray.400'}>Pool{!isCpu && `-${indexAdded}`}</UiText> 
                        <UiText>{coinConfig.pool}</UiText>                
                      </Group>
                      <Group>
                        <UiText color={'gray.400'}>Wallet{!isCpu && `-${indexAdded}`}</UiText>
                        <UiText>{coinConfig.wallet}</UiText> 
                      </Group>
                    </Grid>
                  )
                })}
              </Grid>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem gridRow={'1 / 3'} gridColumn={'3 / 4'}>
          <Wrap h={'full'} justifyContent={'center'} alignItems={'center'} gap={{ base: 4, md: 2}} justify={'center'} w={{ base: 6, md: 'auto'}}>
            {map(renderActions ?? [], (action, index) => (
              <WrapItem key={index}>
                {action(flightSheet.id)}
              </WrapItem>
            ))}
          </Wrap>
        </GridItem>
      </Grid>
      <Box position={'absolute'} bottom={0} display={'flex'} w={'full'} pr={12} justifyContent={'center'}>
        {renderOpenButton && renderOpenButton()}
      </Box>
    </UiContainerRounded>
  )
}