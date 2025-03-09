import { HubConnection } from "@microsoft/signalr";
import { createContext } from "react";

type SignalRContextType = {
  connection: HubConnection | null;
  startConnection: () => Promise<void>;
  stopConnection: () => Promise<void>;
};

export const SignalRContext = createContext<SignalRContextType>({} as SignalRContextType);