import { Table, Text } from "@chakra-ui/react";
import _ from "lodash";
import { CoinType } from "../../model/coin.type";

export function CpuItemTable({
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
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {_.map(headers, (header) => (
              <Table.ColumnHeader bg={'bg.transparent'} p={1} pl={4} pr={4} key={header} textAlign={"center"}>{header}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(coins, (coin) => (
            <Table.Row key={coin.coinName}>
              <Table.Cell p={1} bg={'bg.transparent'} textAlign={"center"} w={'3rem'}>
                {coin.coinName}
              </Table.Cell>
              <Table.Cell p={1} bg={'bg.transparent'} textAlign={"center"} w={'7rem'}>
                {coin.hashRate}
                &nbsp;
                <Text color={'minux.solid'} display={'inline'}>MH/s</Text>
              </Table.Cell>
              <Table.Cell p={1} bg={'bg.transparent'} h={'full'}>
                <Table.Cell color={'green.500'} border={'none'} textAlign={"center"} w={'3rem'} p={0} pr={2}>
                  {coin.shares.accepted}
                </Table.Cell>
                <Table.Cell color={'red.500'} border={'none'} textAlign={"center"} w={'3rem'} p={0} pl={2}>
                  {coin.shares.rejected}
                </Table.Cell>
              </Table.Cell >
              <Table.Cell p={1} bg={'bg.transparent'} textAlign={"center"}>
                {power > 0 ? (coin.hashRate * 1000) / power : '-'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}