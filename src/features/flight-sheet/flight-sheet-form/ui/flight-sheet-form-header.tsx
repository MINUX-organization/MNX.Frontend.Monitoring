import { UiField, UiInput, UiSwitch } from "@/shared/ui";
import { Group, Stack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

export interface FlightSheetFormHeaderProps {
  gpuSwitchValue: boolean
  cpuSwitchValue: boolean
  onGpuSwith: (value: boolean) => void
  onCpuSwitch: (value: boolean) => void
}

export function FlightSheetFormHeader({
  gpuSwitchValue,
  cpuSwitchValue,
  onGpuSwith,
  onCpuSwitch
} : FlightSheetFormHeaderProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Stack direction={'row'}>
      <UiField label={"Flight sheet name"} w={'full'} maxW={'20rem'} mr={4} 
        invalid={!!errors.name} errorText={errors.name?.message?.toString()}
      >
        <Controller
          control={control}
          name={"name"}
          render={({ field }) => (
            <UiInput placeholder={"Write flight sheet name"} {...field}/>
          )}
        />
      </UiField>
      <Group >
        <UiField label={"GPU"}  alignItems={'center'}>
          <UiSwitch h={'40px'} checked={gpuSwitchValue} onCheckedChange={(e) => onGpuSwith(e.checked)}/>
        </UiField>
        <UiField label={"CPU"} alignItems={'center'}>
          <UiSwitch h={'40px'} checked={cpuSwitchValue} onCheckedChange={(e) => onCpuSwitch(e.checked)}/>
        </UiField>
      </Group>
    </Stack>
  )
}