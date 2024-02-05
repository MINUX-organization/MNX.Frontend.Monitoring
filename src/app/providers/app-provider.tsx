import { ComposeChildren } from "@/shared/lib/utils/react";
// import { Confirmations } from "@/widgets/confirmations";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      {/* <Confirmations /> */}
      {children}
    </ComposeChildren>
  );
}