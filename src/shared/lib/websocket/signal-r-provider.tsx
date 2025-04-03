import { BACKEND_HUBS } from "@/shared/constants/backend-urls";
import { HubConnectionState } from "@microsoft/signalr";
import { useEffect, useMemo } from "react";
import { SignalRContext } from "./signal-r-context";
import { createConnection } from "./create-connection";

export function SignalRProvider({
  children,
} : {
  token?: string;
  children?: React.ReactNode;
}) {
  const streamConnection = useMemo(() => createConnection(BACKEND_HUBS.MONITORING), []);
  const notificationConnection = useMemo(() => createConnection(BACKEND_HUBS.NOTIFICATION), []);

  useEffect(() => {
    return () => {
      if (streamConnection.state === HubConnectionState.Connected) {
        streamConnection.stop();
      }

      if (notificationConnection.state === HubConnectionState.Connected) {
        notificationConnection.stop();
      }
    };
  }, [notificationConnection, streamConnection]);

  return (
    <SignalRContext.Provider value={{ streamConnection, notificationConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};