import { Stack, StackProps } from "@chakra-ui/react";
import { RootLayoutSideBarNavItem } from "./root-layout-side-bar-nav-item";
import { RootLayoutNavLink } from "../model/root-layout-nav-link.type";
import _ from "lodash";

interface RootLayoutSideBarNavProps extends StackProps {
  links: RootLayoutNavLink[];
}

export function RootLayoutSideBarNav({ links,...props }: RootLayoutSideBarNavProps) {
  return (
    <Stack {...props}>
      {_.map(links, (link) => 
        <RootLayoutSideBarNavItem key={link.label} link={link} />
      )}
    </Stack>
  )
}