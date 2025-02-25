import { Device, DevicesIcons, UiCheckboxCard } from "@/shared/ui";
import { CheckboxCardRootProps } from "@chakra-ui/react";
import React from "react";

export function FlightSheetSelectorDeviceCard({
  label,
  description,
  device,
  ...props
} : {
  label: React.ReactNode;
  description?: React.ReactNode;
  device: Device
} & CheckboxCardRootProps) {
  return (
    <UiCheckboxCard
      label={label}
      description={description}
      image={<DevicesIcons wi={'20px'} he={'20px'} devices={[device]} />}
      {...props}
    /> 
  )
}