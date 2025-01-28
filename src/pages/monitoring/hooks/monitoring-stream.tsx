import { SubscriptionType } from "@/shared/constants/subscription-type";
import { subscriber } from "@/shared/lib/subscriber";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { useWebsocketContext } from "@/widgets/providers";
import { MonitoringIndicators } from "../model/types";

export function useMonitoringStream() {
    const websocket = useWebsocketContext();

    const monitoringIndicators = useStateObject<MonitoringIndicators>();

    websocket
        ?.stream(SubscriptionType.Monitoring)
        .subscribe(subscriber<MonitoringIndicators>(
            data => monitoringIndicators.setValue(data),
            error => console.error(error),
        ));

    return monitoringIndicators.value;
}