import { Shares, StatisticCoin, TotalCpus, TotalGpus, TotalPower, TotalWorkers } from "@/entities/total/model/types";
import { ChartData } from "@/shared/lib/charts/line-chart";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context"; 
import { match } from 'ts-pattern';
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { CoinsChart } from "@/features/change-coin-chart/ui/change-coin-chart-list";

type Type = 
  "ChartDataList"      |
  "ChartData"          |
  "StatisticCoinList"  |
  "TotalShares"        |
  "TotalPower"         |
  "TotalWorkers"       |
  "TotalGpus"          |
  "TotalCpus"          |
  "CoinChartList"
  
type TriggerData = {
  type: Type;
  newData: unknown;
}

export function useMonitoringSignalTrigger() {
  const maxLenght = useStateObject<number>(150);
  const chartDataList = useStateObject<ChartData[]>();
  const statisticCoinList = useStateObject<StatisticCoin[]>();
  const totalWorkers = useStateObject<TotalWorkers>();
  const totalPower = useStateObject<TotalPower>();
  const totalGpus = useStateObject<TotalGpus>();
  const totalCpus = useStateObject<TotalCpus>();
  const totalShares = useStateObject<Shares>();
  const coinsChart = useStateObject<CoinsChart>();

  WebsocketContext.useSignalREffect(
    'ReceivedTotalData',
    (data: TriggerData) => {
      match(data)
        .with({ type: "ChartDataList" }, ({ newData }) => {
          ZodSaveParse(newData, ChartData.array(), (checkedData) => {
            maxLenght.setValue(checkedData.length)
            chartDataList.setValue(checkedData);
          });
        })
        .with({ type: "ChartData" }, ({ newData }) => {
          ZodSaveParse(newData, ChartData, (checkedData) => { 
            if (chartDataList.value?.length ?? 0 >= maxLenght.value!)
              chartDataList.setValue(chartDataList.value?.splice(0, 1))
            chartDataList.setValue(chartDataList.value?.concat(checkedData))
          });
        })
        .with({ type: 'TotalPower' }, ({ newData }) => 
          ZodSaveParse(newData, TotalPower, (checkedData) => totalPower.setValue(checkedData)))
        .with({ type: 'TotalGpus' }, ({ newData }) => 
          ZodSaveParse(newData, TotalGpus, (checkedData) => totalGpus.setValue(checkedData)))
        .with({ type: 'TotalCpus' }, ({ newData }) => 
          ZodSaveParse(newData, TotalCpus, (checkedData) => totalCpus.setValue(checkedData)))
        .with({ type: 'StatisticCoinList'}, ({ newData }) => 
          ZodSaveParse(newData, StatisticCoin.array(), (checkedData) => statisticCoinList.setValue(checkedData)))
        .with({ type: 'TotalShares' }, ({ newData }) => 
          ZodSaveParse(newData, Shares, (checkedData) => totalShares.setValue(checkedData)))
        .with({ type: 'TotalWorkers' }, ({ newData }) => 
          ZodSaveParse(newData, TotalWorkers, (checkedData) => totalWorkers.setValue(checkedData)))
        .with({ type: 'CoinChartList'}, ({ newData }) => 
          ZodSaveParse(newData, CoinsChart, (checkedData) => coinsChart.setValue(checkedData)))
        .otherwise(() => {
          return;
        });
    }, 
    []
  )

  return {
    chartDataList,
    totalPower,
    totalWorkers,
    totalShares,
    totalGpus,
    statisticCoinList,
    totalCpus,
    coinsChart
  }
}