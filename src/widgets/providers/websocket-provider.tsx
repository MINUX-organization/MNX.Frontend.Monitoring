import { WebsocketContext } from "@/shared/lib/context/websocket-context";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { ReactNode, useContext, useEffect } from "react";

export function WebsocketContextProvider({
  url,
  token,
  children
} : {
  url: string;
  token: string;
  children: ReactNode;
}) {
  const connection = new HubConnectionBuilder()
    .withUrl(url, {
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => token,
      skipNegotiation: true
    })
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    connection.start();

    return () => {
      connection.stop();
    }
  }, []);
  
  return (
    <WebsocketContext.Provider value={connection}>
      {children}
    </WebsocketContext.Provider>
  )
}

export const useWebsocketContext = () => {
  return useContext(WebsocketContext);
}