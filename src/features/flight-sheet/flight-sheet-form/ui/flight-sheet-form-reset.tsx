import { UiButton } from "@/shared/ui";
import { ButtonProps } from "@chakra-ui/react";

export function FlightSheetFormReset({ label, ...props }: {label?: string} & ButtonProps) {
  return (
    <UiButton colorPalette={'cancel'} {...props}>{label ?? 'Reset'}</UiButton>
  )
}