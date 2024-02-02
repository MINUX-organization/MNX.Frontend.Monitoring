export type StatisticCoin = {
  coin: string;
  algorithm: string;
  hashrate: {
    value: number,
    measurement: string
  };
  shares: Shares;
}

export type StatisticGpu = {
  total: number;
  nvidia: number;
  amd: number;
  intel: number;
}

export type StatisticCpu = {
  total: number;
  intel: number;
  amd: number;
}

export type Shares = {
  accepted: number;
  rejected: number;
}

export type FieldWidget = {
  label: string;
  value?: number;
  style?: string;
}