import { WebsocketContext } from "@/shared/lib/context/websocket-context";
import { HttpTransportType } from "@microsoft/signalr";
import { ReactNode } from "react";

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