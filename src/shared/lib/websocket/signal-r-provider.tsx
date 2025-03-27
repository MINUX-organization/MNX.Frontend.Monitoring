import { BACKEND_BASE_URL } from "@/shared/constants/backend-urls";
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useCallback, useEffect, useState } from "react";
import { SignalRContext } from "./signal-r-context";

export function SignalRProvider({
  route,
  token,
  children,
} : {
  route: string;
  token?: string;
  children: React.ReactNode;
}) {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const createConnection = useCallback(() => {
    return new HubConnectionBuilder()
      .withUrl(BACKEND_BASE_URL + route, {
        accessTokenFactory: () => token || '',
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }, [route, token]);

  const startConnection = useCallback(async () => {
    if (!connection && connection === null) return;

    if (connection.state === HubConnectionState.Connected) return;

    try {
      await connection.start();
    } catch (err) {
      console.error('SignalR Connection Error:', err);
    }
  }, [connection]);

  const stopConnection = useCallback(async () => {
    if (!connection && connection === null) return;

    if (connection.state === HubConnectionState.Disconnected) return;

    try {
      await connection.stop();
      console.log('SignalR Disconnected');
    } catch (err) {
      console.error('SignalR Disconnection Error:', err);
    }
  }, [connection]);

  useEffect(() => {
    const newConnection = createConnection();
    setConnection(newConnection);

    return () => {
      if (newConnection.state === HubConnectionState.Connected)
        newConnection.stop();
    };
  }, [createConnection]);

  return (
    <SignalRContext.Provider value={{ connection, startConnection, stopConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};