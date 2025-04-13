import { ButtonGroupProps, ButtonProps, ButtonGroup } from "@chakra-ui/react";
import { UiButton } from "./button";

export interface FormButtonsProps extends ButtonGroupProps {
  confirmButtonprops?: ButtonProps
  cancelButtonprops?: ButtonProps
  disableCancelButton?: boolean
}

export function UiFormButtonsGroup({ confirmButtonprops, cancelButtonprops, disableCancelButton, ...props }: FormButtonsProps) {
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
      {!disableCancelButton && <UiButton
        {...cancelButtonprops}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        colorPalette={"cancel"} 
      >
        Cancel
      </UiButton>}
    </ButtonGroup>
  )
} 