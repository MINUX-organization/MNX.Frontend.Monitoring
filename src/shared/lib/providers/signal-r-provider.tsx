import { BACKEND_BASE_URL } from "@/shared/constants/backend-urls";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useCallback, useEffect, useState } from "react";
import { SignalRContext } from "../contexts/signal-r-context";

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
      })
      .withAutomaticReconnect()
      .build();
  }, [route, token]);

  const startConnection = useCallback(async () => {
    if (!connection) return;

    try {
      await connection.start();
      console.log('SignalR Connected');
    } catch (err) {
      console.error('SignalR Connection Error:', err);
    }
  }, [connection]);

  const stopConnection = useCallback(async () => {
    if (!connection) return;

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
      newConnection.stop();
    };
  }, [createConnection]);

  return (
    <SignalRContext.Provider value={{ connection, startConnection, stopConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};