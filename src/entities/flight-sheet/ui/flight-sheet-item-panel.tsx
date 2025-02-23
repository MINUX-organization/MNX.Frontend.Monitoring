import { UiContainerRounded } from "@/shared/ui/container-rounded";
import { Box, Flex, Grid, Group, Heading, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { FlightSheetType } from "..";
import { Device, DevicesIcons, UiText } from "@/shared/ui";
import _ from "lodash";
import React from "react";

export interface FlightSheetItemPanelProps {
  state: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }
  flightSheet: FlightSheetType;
  renderActions?: ((id: string) => React.ReactNode)[];
}

export function FlightSheetItemPanel({ state, flightSheet, renderActions }: FlightSheetItemPanelProps) {
  const coinConfigs = _.flatMap(flightSheet.targets, (target) => 
    _.map(target.miningConfig.coinConfigs, (coinConfig) => ({
      type: target.miningConfig.$type,
      cryptocurrency: coinConfig.pool.cryptocurrency,
      pool: coinConfig.pool.domain,
      wallet: coinConfig.wallet.name,
    })));

  const miners = _.map(flightSheet.targets, (target) => ({
    type: target.miningConfig.$type,
    ...target.miner,
  }));

  const minersSortedByType = _.orderBy(miners, ['type'], ['desc']);
  const coinConfigsSortedByType = _.orderBy(coinConfigs, ['type'], ['desc']);

  return (
    <UiContainerRounded 
      roundedBottom={state.isOpen ? 'none' : 'md'} 
      h={{ base: 'auto', md: '10rem'}} 
      display={'flex'} 
      alignItems={'center'}
      bg={'bg.transparent'}
    >
      <Stack 
        direction={{ base: 'column', md: 'row'}} 
        alignItems={{ base: 'flex-start', md: 'center'}} 
        flex={1} gap={[2, 6]}
      >
        <Heading w={{ base: 'full', md: '6rem'}} minW={'7rem'} maxW={'15rem'}>{flightSheet.name}</Heading>
        <Grid 
          templateColumns={{ base: '1fr', md: 'auto  repeat(3, auto)'}} 
          templateRows={{ base: 'repeat(4, auto)', md: '1fr'}}
          gap={{ base: 2, md: 0}}
        >
          {_.map(coinConfigsSortedByType, (coinConfig, index) => {
            const isCpu = coinConfig.type === 'CPU';
            const indexAdded = index + 1;
            return (
              <Grid 
                key={coinConfig.cryptocurrency + coinConfig.type}
                gridColumn={{ base: 1, md: '1 / 5'}}
                gap={4} gridTemplateColumns={'subgrid'}
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
        <Stack flex={1} direction={'row'} justify={'center'} css={{ '@media screen and (max-width: 1310px)': { justifyContent: 'flex-start' }}}>
          <Box w={'20rem'} css={{ '@media screen and (max-width: 1310px)': { width: 'auto' }}}>
            <Flex gap={2} direction={'column'}>
              {_.map(minersSortedByType, (miner, index) => (
                <Stack key={miner.type + index} gap={0}>  
                  <Group>
                    <UiText color={'minux.solid'} mr={2}>{miner.type} miner</UiText>
                    <UiText w={{ base: '4rem', lg: 'auto'}} truncate>{miner.name}</UiText>
                  </Group>
                  <DevicesIcons devices={_.split(miner.supportedDevices, ', ') as Device[]} />
                </Stack>
              ))}   
            </Flex>
          </Box>
        </Stack>
        <Wrap justify={'center'} css={{ '@media screen and (max-width: 1100px)': { width: 6 }, '@media screen and (max-width: 900px)': { width: 'full' }}}>
          {_.map(renderActions ?? [], (action, index) => (
            <WrapItem key={index}>
              {action(flightSheet.id)}
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
    </UiContainerRounded>
  )
}