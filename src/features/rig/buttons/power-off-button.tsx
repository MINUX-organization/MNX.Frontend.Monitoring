import { UiButton, UiPopover, UiText } from "@/shared/ui"
import { rigRepository } from "@/entities/rig";
import { Center, Group } from "@chakra-ui/react";

const { useRigMutation } = rigRepository;

export function PowerOffButton({
  rigId
} : {
  rigId: string
}) {
  const { powerOffRig } = useRigMutation();

  const handleClick = (setOpen: (open: boolean) => void) => {
    powerOffRig(rigId);
    setOpen(false);
  };

  return (
    <UiPopover 
      renderTrigger={() => (
        <UiButton colorPalette={'cancel'}>
          Power Off
        </UiButton>
      )}
    >
      {({ setOpen }) => (
        <Center flexDirection={'column'} gap={4}>
          <UiText>Are you sure?</UiText>
          <Group>
            <UiButton width={'4xs'} colorPalette={'accept'} onClick={() => handleClick(setOpen)}>
              Power Off
            </UiButton>
            <UiButton width={'4xs'} colorPalette={'cancel'} onClick={() => setOpen(false)}>
              Cancel
            </UiButton>
          </Group>
        </Center>
      )}
    </UiPopover>
  )
}