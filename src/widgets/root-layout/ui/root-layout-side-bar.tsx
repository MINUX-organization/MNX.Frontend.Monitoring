import { MinuxLogo } from "@/shared/ui/logo";
import { Flex, Stack, StackProps, StackSeparator } from "@chakra-ui/react";
import { RootLayoutSideBarNav } from "./root-layout-side-bar-nav";
import { NAV_FIELDS } from "../model/constants/root-layout-nav-fields.const";
import { UiAvatar } from "@/shared/ui/avatar";

export function RootLayoutSideBar({ ...props }: StackProps) {
  return (
    <Flex {...props} direction={'column'} >
      <Stack separator={<StackSeparator />}>
        <MinuxLogo textClassName={{ 
          "@media screen and (max-width: 1024px)": {
            display: 'none',
          }
         }}/>
        <></>
      </Stack>
      <RootLayoutSideBarNav p={1} as={'nav'} overflow={'auto'} links={NAV_FIELDS} flexGrow={1}/>
      <Stack separator={<StackSeparator />}>
        <></>
        <UiAvatar name={'name'} />
      </Stack>
    </Flex>
  )
}