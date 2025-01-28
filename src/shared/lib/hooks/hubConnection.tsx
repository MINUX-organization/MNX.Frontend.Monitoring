import { HubConnection } from "@microsoft/signalr";
import { createContext, useContext } from "react";

const HubConnectionContext = createContext<HubConnection | undefined>(undefined)

export function useHubConnection() {
  return useContext(HubConnectionContext);
}