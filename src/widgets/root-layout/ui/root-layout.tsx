import { Stack, StackSeparator } from "@chakra-ui/react";
import { RootLayoutSideBar } from "./root-layout-side-bar";
import { RootLayoutMainContent } from "./root-layout-main-content";
import { useState } from "react";

export function RootLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Stack separator={open ? <StackSeparator /> : undefined}
      gap={open ? 2 : 0} 
      minHeight={"100vh"} 
      maxHeight={"100vh"} 
      direction={"row"} 
      padding={2.5}
    >
      <RootLayoutSideBar as={'aside'} open={open} setOpen={setOpen}/>
      <RootLayoutMainContent as={'main'} overflow={'auto'}/>
    </Stack>
  )
}