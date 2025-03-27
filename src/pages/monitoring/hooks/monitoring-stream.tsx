import { SubscriptionType } from "@/shared/constants/subscription-type";
import { useSignalR } from "@/shared/lib/websocket/hubConnection";
import { subscriber } from "@/shared/lib/utils/subscriber";
import { useEffect, useState } from "react";

export function useMonitoringStream() {
  const websocket = useSignalR();
  
  const [monitoringdicators, setMonitoringIndicators] = useState<object>();

  useEffect(() => {
    if (!websocket.connection || websocket.connection === null) return;

    websocket.startConnection().then(() => {
      websocket
        .connection
        ?.stream("Subscribe", SubscriptionType.Monitoring)
        .subscribe(subscriber<object>(
            data => {
              console.log(data)
              setMonitoringIndicators(data);
            },
            error => console.error(error),
        ));
    });
  }, [websocket])

  return monitoringdicators;
}