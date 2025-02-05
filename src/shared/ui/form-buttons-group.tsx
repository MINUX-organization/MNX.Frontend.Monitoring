import { ButtonGroupProps, ButtonProps, ButtonGroup } from "@chakra-ui/react";
import { UiButton } from "./button";

export interface FormButtonsProps extends ButtonGroupProps {
  confirmButtonprops?: ButtonProps
  cancelButtonprops?: ButtonProps
}

export function UiFormButtonsGroup({ confirmButtonprops, cancelButtonprops,...props }: FormButtonsProps) {
  return (
    <ButtonGroup {...props} grow>
      <UiButton
        {...confirmButtonprops}
        w={'full'}
        type="submit"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        colorPalette={"accept"}
      >
        Confirm
      </UiButton>
      <UiButton
        {...cancelButtonprops}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        colorPalette={"cancel"} 
      >
        Cancel
      </UiButton>
    </ButtonGroup>
  )
} 