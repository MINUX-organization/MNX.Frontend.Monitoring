import { ComposeChildren } from "@/shared/lib/utils/compose-children";
import { ReactNode } from "react";
import { UiToaster } from "@/shared/ui/toaster";
import { AppQueryProvider } from "./app-query";
import { AppStylingProvider } from "./app-styling";
import { AppRouterProvider } from "./app-router";

export function AppComposer({ children }: { children?: ReactNode }) {
  return (
    <ComposeChildren>
      <AppQueryProvider />
      <AppStylingProvider>
        <AppRouterProvider />
        {children}
        <UiToaster />
      </AppStylingProvider>
    </ComposeChildren>
  );
}