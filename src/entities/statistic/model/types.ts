export type StatisticCoin = {
  coin: string;
  algorithm: string;
  hashrate: {
    value: number,
    measurement: string};
  shares: {
    accepted: number;
    rejected: number;
  }
}