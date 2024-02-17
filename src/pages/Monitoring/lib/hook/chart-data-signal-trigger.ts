import { ChartData } from "@/shared/lib/charts/line-chart";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";

export function useChartDataSignalTrigger() {
  const chartCoinsList = useStateObject<ChartData[]>();
  const maxLenght = useStateObject<number>(150);

  WebsocketContext.useSignalREffect(
    'ReceivedCurrentHashRate',
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
    'ReceivedHashRateForAPeriod',
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