import { useState } from "react";
import { RootLayoutNavLink } from "../model/root-layout-nav-link.type";
import { Button, Collapsible, Stack, chakra, ButtonProps, Text, } from "@chakra-ui/react";
import { useRouterState, Link } from "@tanstack/react-router";
import _ from "lodash";
import { motion } from "motion/react";
import { ChevronDownIcon } from "@/shared/assets/svg/chevron-down";

const MChevronDownIcon = motion.create(ChevronDownIcon);

const NavButton = chakra(Button, {
  base: {
    '@media (max-width: 1024px)': {
      p: '2'
    },
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
    transition: "all 0.2s ease-in-out",
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
  const router = useRouterState();

  if (!link.to) {
    return null;
  }

  const isActive = _.includes(router.location.pathname, link.to);

  if (link.children) {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger asChild>
          <NavButton
            fontSize={"md"}
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            css={isActive && {
              color: 'minux.solid',
              opacity: 1
            }}
          >
            <TextResponsive link={link}/>
            <MChevronDownIcon 
              css={{
                '@media (max-width: 1024px)': { display: 'none' },
              }} 
              initial={{ rotate: isOpen ? 180 : 0 }} 
              animate={{ rotate: isOpen ? 180 : 0 }}
            />
          </NavButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack css={{
            '@media (max-width: 1024px)': { pl: 0 },
          }} pl={4} pb={1} mt={1} gap={2}>
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
    <Link to={link.to}>
      <NavButton
        variant="ghost" 
        fontSize={fontSize} 
        css={isActive && {
          color: 'minux.solid',
          opacity: 1
        }}
      >
        <TextResponsive link={link}/>
      </NavButton>  
    </Link>
  );
}

export const TextResponsive = ({ link } : { link: RootLayoutNavLink }) =>(
  <Stack direction={'row'}>
    {link.icon}
    <Text css={{ '@media (max-width: 1024px)': { display: 'none' } }}>
      {link.label}
    </Text>
  </Stack>
)