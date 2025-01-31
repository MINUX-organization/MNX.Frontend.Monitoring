import { Stack, StackSeparator } from "@chakra-ui/react";
import { RootLayoutSideBar } from "./root-layout-side-bar";
import { RootLayoutMainContent } from "./root-layout-main-content";

export function RootLayout() {
  return (
    <Stack separator={<StackSeparator />} minHeight={"100vh"} direction={"row"} padding={2.5}>
      <RootLayoutSideBar as={'aside'}/>
      <RootLayoutMainContent as={'main'} />
    </Stack>
  )
}