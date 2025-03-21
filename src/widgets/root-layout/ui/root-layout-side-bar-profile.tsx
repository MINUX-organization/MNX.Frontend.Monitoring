import { RemoveSessionButton } from "@/features/auth";
import { EditPasswordButton, EditPasswordForm, RefreshKeyButton } from "@/features/profile";
import { ProfilePanel, ProfilePanelPopover } from "@/entities/profile";
import { profileRepository } from "@/entities/profile/model/profile.repository";
import { StackSeparator, Stack } from "@chakra-ui/react";

const { useProfileQuery, useProfileMutation } = profileRepository

export function RootLayoutSideBarProfile() {
  const { profile } = useProfileQuery();
  const { editNickname } = useProfileMutation();

  return (
    <Stack separator={<StackSeparator />}>
      <></>
      <ProfilePanelPopover
        contentprops={{ w: "22rem" }}
        disabled={!profile}
        profile={profile}
        onSaveNickname={async (nickname) => await editNickname(nickname)}
        renderLogOutButton={() => <RemoveSessionButton w={'full'} />}
        renderEditPasswordButton={() => 
          <EditPasswordButton 
            w={'full'} 
            renderEditPasswordForm={(setOpen) => <EditPasswordForm onClose={() => setOpen(false)}/>}
          />}
        renderTrigger={(open) => 
          <ProfilePanel
            buttonProps={{ bg: open ? 'var(--mnx-colors-color-palette-subtle)' : 'ghost' }}
            profile={profile}
          />} 
        renderRefreshButton={() => <RefreshKeyButton />}
      />
    </Stack>
  )
}