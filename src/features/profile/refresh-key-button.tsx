import { profileRepository } from "@/entities/profile";
import { RefreshIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";

const { useProfileMutation } = profileRepository;

export function RefreshKeyButton() {
  const { generateKey } = useProfileMutation();

  const handleClick = async () => {
    await generateKey();
  }

  return (
    <IconButton variant={'ghost'} aria-label="Generate key" onClick={handleClick}>
      <RefreshIcon />
    </IconButton>
  )
}