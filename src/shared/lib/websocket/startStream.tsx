/* eslint-disable react-hooks/exhaustive-deps */
import { SubscriptionType } from "@/shared/constants/subscription-type";
import { useSignalR } from "./hubConnection";
import { useEffect } from "react";
import { subscriber } from "../utils/subscriber";
import { HubConnectionState } from "@microsoft/signalr";

export function useStartStream<T>(
  methodName: string, 
  subscriptionType: SubscriptionType, 
  callback: (data: T) => void) {
  const websocket = useSignalR();
  
  useEffect(() => {
    if (!websocket.connection || websocket.connection === null) return;

    if (websocket.connection.state !== HubConnectionState.Disconnected) 
      return;

    websocket.startConnection().then(() => {
      websocket
        .connection
        ?.stream(methodName, subscriptionType)
        .subscribe(subscriber<T>(
            callback,
            console.error,
        ));
    });

    return () => {
      if (!websocket.connection || websocket.connection === null) return;
      if (websocket.connection.state === HubConnectionState.Connected) {
        websocket.connection.stop();
      }
    }
  }, [websocket])
}