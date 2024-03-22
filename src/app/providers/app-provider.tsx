import { ComposeChildren } from "@/shared/lib/hooks/react";
import { AppLoader } from "./app-loader";
import QueryProvider from "./app-query";
import { AuthProvider } from "./app-auth";
// import { Confirmations } from "@/widgets/confirmations";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      {/* <Confirmations /> */}
      <AppLoader/>
      <QueryProvider/>
      <AuthProvider/>
      {children}
    </ComposeChildren>
  );
}