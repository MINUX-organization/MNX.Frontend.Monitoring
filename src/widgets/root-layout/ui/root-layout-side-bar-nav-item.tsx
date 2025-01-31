import { useState } from "react";
import { RootLayoutNavLink } from "../model/root-layout-nav-link.type";
import { Button, Collapsible, Stack, chakra, ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import _ from "lodash";
import { LuChevronDown } from "react-icons/lu";
import { motion } from "motion/react";

const MLuChevronDown = motion.create(LuChevronDown);

const NavButton = chakra(Button, {
  base: {
    fontSize: "md",
    justifyContent: "space-between",
    width: "100%",
    textAlign: "left",
    opacity: 0.5,
    _hover: {
      opacity: 1,
    },
    _open: {
      opacity: 1,
    },
    transition: "opacity 0.2s ease-in-out",
  },
});

export function RootLayoutSideBarNavItem({ 
  link, 
  fontSize 
} : { 
  link: RootLayoutNavLink, 
  fontSize?: string 
} & ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate({ to: link.to });
  }

  if (link.children) {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger asChild>
          <NavButton
            fontSize={"md"}
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Stack direction={'row'}>
              {link.icon}
              {link.label}
            </Stack>
            <MLuChevronDown initial={{ rotate: isOpen ? 180 : 0 }} animate={{ rotate: isOpen ? 180 : 0 }}/>
          </NavButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack pl={4} mt={1} gap={2}>
            {_.map(link.children, (child) => (
              <RootLayoutSideBarNavItem 
                key={child.label} 
                link={{...child, to: `${link.to}${child.to}`}}fontSize={'sm'}
              />
            ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <NavButton 
      variant="ghost" 
      fontSize={fontSize} 
      onClick={handleLinkClick}
    >
      <Stack direction={'row'}>
        {link.icon}
        {link.label}
      </Stack>
    </NavButton>  
  );
}