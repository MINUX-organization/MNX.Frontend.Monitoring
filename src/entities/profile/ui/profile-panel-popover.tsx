import { PopoverProps, UiPopover } from "@/shared/ui/popover"
import { ProfileField } from "../model/profile-fields"
import { Stack, StackSeparator, VStack, Box, ButtonGroup, Group } from "@chakra-ui/react"
import map from "lodash/map"
import { ProfileType } from "../model/profile.type"
import { UiAvatar, UiText, UiEditableInput, UiField } from "@/shared/ui"
import { match } from "ts-pattern"

interface ProfilePanelPopoverProps extends PopoverProps {
  profile?: ProfileType;
  renderLogOutButton?: () => React.ReactNode;
  onSaveNickname?: (value: string) => void;
  onSaveEmail?: (value: string) => void;
  onSaveTelegram?: (value: string) => void;
  renderEditPasswordButton?: () => React.ReactNode;
  renderRefreshButton?: () => React.ReactNode;
}

export function ProfilePanelPopover({ 
  profile,
  renderLogOutButton,
  onSaveNickname,
  onSaveEmail,
  onSaveTelegram,
  renderEditPasswordButton,
  renderRefreshButton,
  ...props 
} : ProfilePanelPopoverProps ) {
  const profileFields: ProfileField[] = [
    { label: 'Nickname', value: profile?.nickname, editable: true, callback: onSaveNickname },
    { label: 'Signup Date', value: new Date(profile?.registrationDate ?? '').toLocaleDateString() },
    { label: 'Email', value: profile?.email ?? 'Not Linked', confirmed: profile?.emailConfirmed, editable: true, callback: onSaveEmail },
    { label: 'Telegram', value: profile?.telegram ?? 'Not Linked', confirmed: profile?.telegramConfirmed, editable: true, callback: onSaveTelegram },
  ]

  return (
    <UiPopover {...props}>
      <Stack separator={<StackSeparator borderColor={'silver'} opacity={0.25}/>} >
        <VStack>
          <UiAvatar name={profile?.login} w={'4rem'} h={'4rem'}/>
          <UiText>{profile?.login}</UiText>
        </VStack>
        <Stack gap={{ base: 2, lg: 4 }} mt={3} mb={3}>
          {map(profileFields, (field) => (
            <UiField 
              key={field.label} 
              label={field.label} 
              orientation={'horizontal'} 
              confirmed={field.confirmed}
              labelprops={{ opacity: 0.75 }}
            >
              <Box w={'10.5rem'}>
              {
                match(field.editable)
                  .with(true, () => (
                    <UiEditableInput onSave={field.callback} justifyContent={'space-between'} value={field.value}/>
                  ))
                  .otherwise(() => <UiText pl={1} flexGrow={1}>{field.value}</UiText>)
              }
              </Box>
            </UiField>
          ))}
          <UiField 
            label={'Key'}
            orientation={'horizontal'} 
            labelprops={{ opacity: 0.75 }}
          >
            <Group w={'10.5rem'}>
              <UiText pl={1} flexGrow={1}>{profile?.key ?? 'Not Generated'}</UiText>
              {renderRefreshButton?.()}
            </Group>
            
          </UiField>
        </Stack>
        <ButtonGroup flexGrow={1}>
          <Box w={'1/2'}>
            {renderEditPasswordButton?.()}
          </Box>
          <Box w={'1/2'}>
            {renderLogOutButton?.()}
          </Box>
        </ButtonGroup>
      </Stack>
    </UiPopover>
  )
}