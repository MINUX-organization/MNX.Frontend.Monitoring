import { UiContainerRounded } from "@/shared/ui/container-rounded";
import { BoxProps } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";

export function RootLayoutMainContent({ ...props }: BoxProps) {
  return (
    <UiContainerRounded {...props} width={'100%'} border={'none'}>
      <Outlet />
    </UiContainerRounded>
  )
}