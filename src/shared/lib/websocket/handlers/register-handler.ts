import { HubConnection, HubConnectionState } from "@microsoft/signalr"

export const registerHandler = async <T>(websocket: HubConnection | null, methodName: string, callback: (data?: T) => void) => {
  if (websocket === null) return
  
  if (websocket?.state === HubConnectionState.Disconnected) {
    await websocket.start();
  }

  websocket.on(
    methodName, 
    callback
  )
}

export const unregisterHandler= (websocket: HubConnection | null, methodName: string) => {
  if (websocket?.state === HubConnectionState.Connected) {
    websocket.off(methodName);
  }
}