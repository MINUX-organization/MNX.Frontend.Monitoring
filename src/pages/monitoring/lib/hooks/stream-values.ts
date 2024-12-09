import { SharesCount, TotalPower } from "@/entities/total";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { useWebsocketContext } from "@/widgets/providers";
import { SUBSCRIPTION_TYPES } from "../../model/types";
import { IStreamSubscriber } from "@microsoft/signalr";

const subscriber = <T>(
  onNext: (value: T) => void, 
  onError?: (error: Error) => void, 
  onComplete?: () => void
) => {
  return {
    next(value) {
      onNext(value);
    },
    error(error) {
      onError?.(error);
    },
    complete() {
      onComplete?.()
    }
  } as IStreamSubscriber<T>
}

export function useStreamValues() {
  const websocket = useWebsocketContext();

  const streamValues = {
    totalShares: useStateObject<SharesCount>(),
    totalPower: useStateObject<TotalPower>(),
  }

  websocket
    ?.stream<SharesCount>(SUBSCRIPTION_TYPES.TotalShares)
    .subscribe(subscriber((value) => {
      streamValues.totalShares.setValue(value);
    }
  ));

  websocket
    ?.stream<TotalPower>(SUBSCRIPTION_TYPES.TotalPower)
    .subscribe(subscriber((value) => {
      streamValues.totalPower.setValue(value);
    }
  ));

  return {
    totalShares: streamValues.totalShares.value,
    totalPower: streamValues.totalPower.value
  };
}