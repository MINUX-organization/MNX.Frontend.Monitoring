import { ComposeChildren } from "@/shared/lib/utils/react";
import { AppLoader } from "./app-loader";
// import { Confirmations } from "@/widgets/confirmations";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      {/* <Confirmations /> */}
      <AppLoader/>
      {children}
    </ComposeChildren>
  );
}