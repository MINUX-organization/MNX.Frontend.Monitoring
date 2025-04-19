import { useState } from "react";
import { RootLayoutNavLink } from "../model/root-layout-nav-link.type";
import { Collapsible, Stack, ButtonProps } from "@chakra-ui/react";
import { useRouterState, Link } from "@tanstack/react-router";
import map from "lodash/map";
import includes from "lodash/includes";
import { motion } from "motion/react";
import { ChevronDownIcon } from "@/shared/assets/svg/chevron-down";
import { UiText, UiButton } from "@/shared/ui";

const MChevronDownIcon = motion.create(ChevronDownIcon);

const NavButton = ({ children, isActive, ...props }: { isActive?: boolean } & ButtonProps) => (
  <UiButton 
    {...props}
    variant={"ghost"}
    p={2} 
    w={'full'} 
    justifyContent={{base: 'center', lg: 'space-between'}} 
    textAlign={'left'}
    css={{
      opacity: 0.75,
      ...(isActive && {
        color: 'minux.solid',
        opacity: 1,
      }),
    }}
    _open={{
      opacity: 1,
    }}
    _hover={{
      opacity: 1,
    }}
  >
    {children}
  </UiButton>
);

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
  
  const isActive = includes(router.location.pathname, link.to);

  if (link.children) {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger asChild>
          <NavButton
            isActive={isActive}
            onClick={() => setIsOpen(!isOpen)}
          >
            <TextResponsive link={link} fontSize={'lg'} />
            <MChevronDownIcon 
              display={{ base: 'none', lg: 'block' }} 
              initial={{ rotate: isOpen ? 180 : 0 }} 
              animate={{ rotate: isOpen ? 180 : 0 }}
            />
          </NavButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack pl={{ lg: 4 }} mt={2} gap={2} >
            {map(link.children, (child) => (
              <RootLayoutSideBarNavItem 
                key={child.label} 
                link={{...child, to: `${link.to}${child.to}`}}
                fontSize={'md'}
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
        isActive={isActive}
        disabled={link.disabled}
      >
        <TextResponsive link={link} fontSize={fontSize || 'lg'} />
      </NavButton>  
    </Link>
  );
}

export const TextResponsive = ({ link, fontSize } : { link: RootLayoutNavLink, fontSize?: string }) =>(
  <Stack direction={'row'} alignItems={'center'}>
      {link.icon}
      <UiText display={{ base: 'none', lg: 'block' }} fontSize={fontSize}>
        {link.label}
      </UiText>
  </Stack>
)