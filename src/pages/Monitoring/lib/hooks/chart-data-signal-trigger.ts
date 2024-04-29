import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";
import { ChartData } from "@/shared/lib/charts/line-chart";
import { WebsocketContext } from "@/shared/lib/context/websocket-context";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";

export function useChartDataSignalTrigger() {
  const chartCoinsList = useStateObject<ChartData[]>();
  const maxLenght = useStateObject<number>(150);

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_CURRENT_HASHRATE,
    (data: unknown) => {
      ZodSaveParse(data, ChartData, (checkedData) => { 
        if (chartCoinsList.value?.length ?? 0 >= maxLenght.value!)
        chartCoinsList.setValue(chartCoinsList.value?.splice(0, 1))
        chartCoinsList.setValue(_.concat(chartCoinsList.value ?? [], checkedData))
      });
    },
    []
  );

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_HASH_RATE_FOR_A_PERIOD,
    (data: unknown) => {
      ZodSaveParse(data, ChartData.array(), (checkedData) => {
        maxLenght.setValue(checkedData.length)
        chartCoinsList.setValue(checkedData);
      });
    },
    []
  )

  return chartCoinsList;
}