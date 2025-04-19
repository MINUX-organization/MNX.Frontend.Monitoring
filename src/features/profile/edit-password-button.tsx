import { UiButton, UiPopover, UiText } from "@/shared/ui";
import { ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface EditPasswordButtonProps extends ButtonProps {
  renderEditPasswordForm?: (setOpen: (open: boolean) => void) => ReactNode;
}

export function EditPasswordButton({ renderEditPasswordForm, ...props }: EditPasswordButtonProps) {
  return (
    <UiPopover renderTrigger={() => (
      <UiButton {...props} colorPalette={'accept'}>
        <UiText>
          Edit Password
        </UiText>
      </UiButton>
    )}>
      {({ setOpen }) => renderEditPasswordForm?.(setOpen)}
    </UiPopover>

  )
}