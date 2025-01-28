import { SubscriptionType } from "@/shared/constants/subscription-type";
import { subscriber } from "@/shared/lib/subscriber";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { useWebsocketContext } from "@/widgets/providers";
import { DevicesIndicators } from "../model/types";

export function useDevicesStream() {
  const websocket = useWebsocketContext();
  
  const devicesIndicators = useStateObject<DevicesIndicators>();

  websocket
      ?.stream(SubscriptionType.Devices)
      .subscribe(subscriber<DevicesIndicators>(
          data => devicesIndicators.setValue(data),
          error => console.error(error),
      ));

  return devicesIndicators.value;
}