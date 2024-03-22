import { HttpTransportType } from "@microsoft/signalr";
import { ReactNode } from "react";
import { createSignalRContext } from "react-signalr/signalr";

export const WebsocketContext = createSignalRContext()

export function WebsocketContextProvider({
  url,
  token,
  children
} : {
  url: string;
  token?: string;
  children: ReactNode;
}) {
  return (
    <WebsocketContext.Provider
      skipNegotiation
      transport={HttpTransportType.WebSockets}
      accessTokenFactory={() => token ?? ''} 
      dependencies={[token]} 
      url={url}
    >
      {children}
    </WebsocketContext.Provider>
  )
}