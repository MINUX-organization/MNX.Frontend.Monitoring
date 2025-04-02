import { HubConnection } from "@microsoft/signalr";
import { createContext } from "react";

export type SignalRContextType = {
  streamConnection: HubConnection | null;
  notificationConnection: HubConnection | null;
};

export const SignalRContext = createContext<SignalRContextType>({} as SignalRContextType);