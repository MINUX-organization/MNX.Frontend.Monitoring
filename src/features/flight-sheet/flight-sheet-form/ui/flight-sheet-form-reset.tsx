import { UiButton } from "@/shared/ui";
import { ButtonProps } from "@chakra-ui/react";

export function FlightSheetFormReset({ ...props }: ButtonProps) {
  return (
    <UiButton colorPalette={'cancel'} {...props}>Reset</UiButton>
  )
}