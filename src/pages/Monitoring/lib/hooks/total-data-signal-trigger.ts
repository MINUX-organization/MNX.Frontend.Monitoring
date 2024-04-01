import { SharesCount, TotalCoinValue, TotalCpusCount, TotalGpusCount, TotalPower, TotalRigsCount } from "@/entities/total";
import { WebsocketContext } from "@/widgets/providers/websocket-provider"; 
import { match } from 'ts-pattern';
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { CoinChartList } from "@/features/chart/change-coin-chart";
import _ from "lodash";
import { TriggerTotalData } from "../../model/types";
import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";

export function useTotalDataSignalTrigger() {
  const coinsCache = useStateObject<string[]>([]);
  const chartCoinsList = useStateObject<CoinChartList>();
  const totalCoinsList = useStateObject<TotalCoinValue[]>();
  const totalRigsCount = useStateObject<TotalRigsCount>();
  const totalPower = useStateObject<TotalPower>();
  const totalGpusCount = useStateObject<TotalGpusCount>();
  const totalCpusCount = useStateObject<TotalCpusCount>();
  const totalShares = useStateObject<SharesCount>();

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_TOTAL_DATA,
    (data: TriggerTotalData) => {
      match(data)
        .with({ type: 'TotalPower' }, ({ newData }) => 
          ZodSaveParse(newData, TotalPower, (checkedData) => totalPower.setValue(checkedData)))
        .with({ type: 'TotalGpusCount' }, ({ newData }) => 
          ZodSaveParse(newData, TotalGpusCount, (checkedData) => totalGpusCount.setValue(checkedData)))
        .with({ type: 'TotalCpusCount' }, ({ newData }) => 
          ZodSaveParse(newData, TotalCpusCount, (checkedData) => totalCpusCount.setValue(checkedData)))
        .with({ type: 'TotalCoinsList'}, ({ newData }) => {
          ZodSaveParse(newData, TotalCoinValue.array(), (checkedData) => {
            const coinsList = _.map(checkedData, (item) => item.coin);
            if (!_.isEqual(coinsCache.value, coinsList)) {
              coinsCache.setValue(coinsList);
              chartCoinsList.setValue(coinsList);
            }
            totalCoinsList.setValue(checkedData); 
          })
        }) 
        .with({ type: 'TotalShares' }, ({ newData }) => 
          ZodSaveParse(newData, SharesCount, (checkedData) => totalShares.setValue(checkedData)))
        .with({ type: 'TotalRigsCount' }, ({ newData }) => 
          ZodSaveParse(newData, TotalRigsCount, (checkedData) => totalRigsCount.setValue(checkedData)))
        .otherwise(() => {return});
    }, 
    []
  )

  return {
    totalPower,
    totalRigsCount,
    totalShares,
    totalGpusCount,
    totalCoinsList,
    totalCpusCount,
    chartCoinsList
  }
}