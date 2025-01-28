import { useSessionRepository } from "@/entities/session";
import { WebsocketContext } from "@/shared/lib/context/websocket-context";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { ReactNode, useContext, useEffect } from "react";

export function WebsocketContextProvider({
  url,
  children
} : {
  url: string;
  children: ReactNode;
}) {
  const session = useSessionRepository().getSession();

  const connection = new HubConnectionBuilder()
    .withUrl(url, {
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => session?.accessToken ?? '',
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