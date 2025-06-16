import { profileRepository } from "@/entities/profile";
import { RefreshIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";

const { useProfileMutation } = profileRepository;

export function RefreshKeyButton() {
  const { generateKey } = useProfileMutation();

  const handleClick = async () => {
    await generateKey();
  }

  return (
    <UiTooltip content="Update the user's key">
      <IconButton variant={'ghost'} aria-label="Generate key" as="div" onClick={handleClick}>
        <RefreshIcon />
      </IconButton>
    </UiTooltip>
  )
}