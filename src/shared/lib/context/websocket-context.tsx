import { HubConnection } from "@microsoft/signalr";
import { createContext } from "react";

export const WebsocketContext = createContext<HubConnection | undefined>(undefined)