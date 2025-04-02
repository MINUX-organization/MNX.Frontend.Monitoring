import { BACKEND_BASE_URL } from "@/shared/constants/backend-urls";
import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const createConnection = (route: string, token?: string) => {
  return new HubConnectionBuilder()
    .withUrl(BACKEND_BASE_URL + route, {
      accessTokenFactory: () => token || '',
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();
};