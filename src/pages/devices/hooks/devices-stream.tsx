import { SubscriptionType } from "@/shared/constants/subscription-type";
import { useSignalR } from "@/shared/lib/hooks/hubConnection";
import { subscriber } from "@/shared/lib/utils/subscriber";
import { useEffect, useState } from "react";
import { DevicesIndicators } from "../model/dynamic-devices-indicators.type";

export function useDevicesStream() {
  const websocket = useSignalR();
  
  const [devicesIndicators, setDevicesIndicators] = useState<DevicesIndicators>();

  useEffect(() => {
    if (!websocket.connection || websocket.connection === null) return;

    websocket.startConnection().then(() => {
      websocket
        .connection
        ?.stream("Subscribe", SubscriptionType.Devices)
        .subscribe(subscriber<DevicesIndicators>(
            setDevicesIndicators,
            console.error,
        ));
    });
  }, [websocket])

  return devicesIndicators;
}