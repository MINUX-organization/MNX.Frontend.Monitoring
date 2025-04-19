import { Box, BoxProps, ButtonProps, Group, GroupProps, HStack } from "@chakra-ui/react";
import { ProfileType } from "../model/profile.type";
import { match } from "ts-pattern";
import { UiText, UiButton, UiSkeleton, UiSkeletonCircle, UiAvatar } from "@/shared/ui";


interface ProfilePanelProps extends BoxProps {
  profile?: ProfileType
  groupProps?: GroupProps
  buttonProps?: ButtonProps
}

export function ProfilePanel({ profile, groupProps, buttonProps, ...props }: ProfilePanelProps) {
  return (
    <Box {...props} h={'3rem'} w={{ base: '50px', lg: 'full'}}>
      {
        match(profile)
          .with(undefined, () => (
            <HStack direction={'row'} flexGrow={1} h={'3rem'} w={'full'}>
              <UiSkeletonCircle size={'40px'} ml={1} mr={1}/>
              <UiSkeleton h={6} flexGrow={1} display={{ base: 'none', lg: 'block' }}/>
            </HStack>
          ))
          .otherwise((profile) => (
            <UiButton w={'full'} h={'full'} flexGrow={1} variant={'ghost'} p={0} pt={1} pb={1} justifyContent={'flex-start'} {...buttonProps}> 
              <Group {...groupProps}>
                <UiAvatar name={profile.nickname} ml={1} mr={1}/>
                <UiText w={'10rem'} truncate textAlign={'left'} display={{ base: 'none', lg: 'block' }}>{profile.nickname}</UiText>
              </Group>
            </UiButton>
          ))
      }
    </Box>
  )
} 