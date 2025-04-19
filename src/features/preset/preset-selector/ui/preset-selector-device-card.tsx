import { CheckboxCardProps, Device, DevicesIcons, UiCheckboxCard } from "@/shared/ui";
import React from "react";

export function PresetSelectorDeviceCard({
  label,
  description,
  device,
  ...props
} : {
  label: React.ReactNode;
  description?: React.ReactNode;
  device: Device
} & CheckboxCardProps) {
  return (
    <UiCheckboxCard
      label={label}
      description={description}
      image={<DevicesIcons wi={'20px'} he={'20px'} devices={[device]} />}
      {...props}
    /> 
  )
}