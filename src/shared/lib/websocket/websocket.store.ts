import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";

export type WsStore = {
  streamConnection: HubConnection | null;
  notificationConnection: HubConnection | null;
};

export type WsAction = {
  setStreamConnection: (connection: HubConnection | null) => void;
  setNotificationConnection: (connection: HubConnection | null) => void;
}

export const websocketStore = create<WsStore & WsAction>((set) => ({
  streamConnection: null,
  notificationConnection: null,
  setStreamConnection: (connection) => set({ streamConnection: connection }),
  setNotificationConnection: (connection) => set({ notificationConnection: connection }),
}))