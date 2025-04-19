import { MinuxLogo } from "@/shared/ui/logo";
import { Box, Flex, Stack, StackProps, StackSeparator } from "@chakra-ui/react";
import { RootLayoutSideBarNav } from "./root-layout-side-bar-nav";
import { NAV_FIELDS } from "../model/constants/root-layout-nav-fields.const";
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from "motion/react";
import { RootLayoutSideBarProfile } from "./root-layout-side-bar-profile";

// TODO: animate side bar in future
const MFlex = motion.create(Flex);
const MIcon = motion.create(FaArrowLeft);

interface RootLayoutSideBarProps extends StackProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}

export function RootLayoutSideBar({ setOpen, open, ...props }: RootLayoutSideBarProps) {
  return (
    <Box 
      {...props} 
      direction={'column'} 
      position={'relative'}
      transition={'width 0.2s ease-in-out'}
    >
      <MFlex 
        direction={'column'} 
        position={'relative'} 
        h={'full'} 
        css={{
          ...(!open && {
            overflow: 'hidden',
            width: '0',
          }),
        }}
      >
        <Stack separator={<StackSeparator />}>
          <MinuxLogo textClassName={{ display: { base: 'none', lg: 'block' } }}/>
          <></>
        </Stack>
        <RootLayoutSideBarNav 
          pl={1} pr={1} pt={1} 
          as={'nav'} 
          overflowY={'auto'}
          overflowX={'hidden'} 
          links={NAV_FIELDS} 
          flexGrow={1}
        />
        <RootLayoutSideBarProfile />
      </MFlex>
      <Box 
        display={{ base: 'flex', md: 'none' }} 
        position={'absolute'} 
        top={10} right={open ? -8 : -3}
        w={'1.5rem'} h={'2rem'}
        bg={'bg'}
        onClick={() => setOpen((prev)  => !prev)}
        alignItems={'center'}
        justifyContent={'center'}
        border={'1px solid var(--global-color-border)'}
        borderEndRadius={'15px'}
        zIndex={1}
      >
        <MIcon size={'0.725rem'} layout initial={{ rotate: open ? 180 : 0 }} animate={{ rotate: !open ? 180 : 0 }}/>
      </Box>
    </Box>
  )
}