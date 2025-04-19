import { Box, Table, Text } from "@chakra-ui/react";
import map from "lodash/map";
import { CoinType } from "../../model/coin.type";
import { calculatePerformance } from "@/shared/lib/utils/calculatePerformance";
import { calculateHashRate } from "@/shared/lib/utils/calculateHashRate";

export function GpuItemTable({
  coins,
  power,
} : {
  coins: CoinType[];
  power: number;
}) {
  const headers = [
    "Coin",
    "Hashrate",
    "Shares",
    "Performance",
  ]

  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root bg={'transparent'}>
        <Table.Header bg={'transparent'}>
          <Table.Row bg={'transparent'}>
            {map(headers, (header) => (
              <Table.ColumnHeader bg={'bg.transparent'} p={1} pl={4} pr={4} key={header} textAlign={"center"}>
                {header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body bg={'transparent'}>
          {map(coins, (coin) => {
            const hashRate = calculateHashRate(coin.hashRate);

            return (<Table.Row key={coin.coinName} bg={'transparent'}>
              <Table.Cell p={1} bg={'bg.transparent'} textAlign={"center"} w={'3rem'}>
                {coin.coinName}
              </Table.Cell>
              <Table.Cell p={1} bg={'bg.transparent'} textAlign={"center"} w={'7rem'}>
                {hashRate.value}
                &nbsp;
                <Text color={'minux.solid'} display={'inline'}>{hashRate.unit}</Text>
              </Table.Cell>
              <Table.Cell p={1} bg={'bg.transparent'} h={'full'} textAlign={'center'}>
                  <Box display={'inline'} color={'green.500'} border={'none'} textAlign={"center"} w={'3rem'} p={0} pr={2}>
                    {coin.shares.accepted}
                  </Box>
                  <Box display={'inline'} color={'red.500'} border={'none'} textAlign={"center"} w={'3rem'} p={0} pl={2}>
                    {coin.shares.rejected}
                  </Box>
              </Table.Cell >
              <Table.Cell p={1} bg={'bg.transparent'} textAlign={"center"}>
                {power > 0 ? calculatePerformance(coin.hashRate, power) : '-'}
              </Table.Cell>
            </Table.Row>)
          })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}