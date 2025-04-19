/* eslint-disable react-hooks/exhaustive-deps */
import { SubscriptionType } from "@/shared/constants/subscription-type";
import { subscriber } from "../utils/subscriber";
import { HubConnection } from "@microsoft/signalr";

export function startStream<T>(
  connection: HubConnection | null,
  methodName: string, 
  subscriptionType: SubscriptionType, 
  callback: (data: T) => void) {
  const stream = connection
    ?.stream(methodName, subscriptionType)
    .subscribe(subscriber<T>(
        callback,
        console.error,
    ));

  return stream
}