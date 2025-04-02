/* eslint-disable react-hooks/exhaustive-deps */
import { BACKEND_BASE_URL, BACKEND_HUBS } from "@/shared/constants/backend-urls";
import { HttpTransportType, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useCallback, useEffect, useMemo } from "react";
import { SignalRContext } from "./signal-r-context";

export function SignalRProvider({
  token,
  children,
} : {
  token?: string;
  children?: React.ReactNode;
}) {
  const createConnection = useCallback((route: string, token?: string) => {
    return new HubConnectionBuilder()
      .withUrl(BACKEND_BASE_URL + route, {
        accessTokenFactory: () => token || '',
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }, []);

  const streamConnection = useMemo(() => createConnection(BACKEND_HUBS.MONITORING, token), [createConnection]);
  const notificationConnection = useMemo(() => createConnection(BACKEND_HUBS.NOTIFICATION, token), [createConnection]);

  useEffect(() => {
    return () => {
      if (streamConnection.state === HubConnectionState.Connected) {
        streamConnection.stop();
      }

      if (notificationConnection.state === HubConnectionState.Connected) {
        notificationConnection.stop();
      }
    };
  }, [createConnection, notificationConnection, streamConnection]);

  return (
    <SignalRContext.Provider value={{ streamConnection, notificationConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};