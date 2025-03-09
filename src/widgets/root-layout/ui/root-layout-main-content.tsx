import { UiContainerRounded } from "@/shared/ui";
import { BoxProps, Loader } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { RootLayoutMainContentNav } from "./root-layout-main-content-nav";

export function RootLayoutMainContent({ ...props }: BoxProps) {
  return (
    <UiContainerRounded 
      width={'100%'} 
      border={'none'} 
      position={'relative'} 
      display={'flex'}
      flexDirection={'column'}
      gap={4}
      {...props}
    >
      <RootLayoutMainContentNav />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </UiContainerRounded>
  )
}