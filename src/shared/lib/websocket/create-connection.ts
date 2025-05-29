import { BACKEND_BASE_URL } from "@/shared/constants/backend-urls";
import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const createConnection = (route: string) => {
  return new HubConnectionBuilder()
    .withUrl(BACKEND_BASE_URL + route, {
      accessTokenFactory: () => {
        const token = localStorage.getItem('session');
        if (!token) {
          console.error('No token found');
          return '';
        }
        
        const parsedToken = token ? JSON.parse(token) : {};
      
        return parsedToken['accessToken'] as string || '';
      },
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .configureLogging(LogLevel.None)
    .withAutomaticReconnect()
    .build();
};