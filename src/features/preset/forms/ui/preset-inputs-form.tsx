/* eslint-disable react-hooks/exhaustive-deps */
import { gpuRestrictionsOptions } from "@/entities/devices"
import { HeaderSeparator, UiButton, UiField, UiInput, UiSwitch, UiText } from "@/shared/ui"
import { Group, Stack } from "@chakra-ui/react"
import { convertToInput } from "../utils/convert-to-input-values"
import map from "lodash/map"
import camelCase from "lodash/camelCase"
import { UiSlider } from "@/shared/ui/slider"
import { Controller, useForm } from "react-hook-form"
import { transformInputToObject } from "../utils/transform-input-to-object"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo } from "react"
import { InputValuesType } from "../model/input.type"
import { DeviceType, OverclockingType } from "@/shared/types"
import { match } from "ts-pattern"
import { FanTabs } from "./fan/fan-tabs"

export function PresetInputsForm({
  overclockingPresetValues,
  setOverclocking,
  deviceIdOrName
} : {
  overclockingPresetValues?: OverclockingType
  setOverclocking: (overclocking: OverclockingType) => void
  deviceIdOrName?: string
}) {
  const { data: restrictions } = useSuspenseQuery(gpuRestrictionsOptions(deviceIdOrName));

  const gpuRestrictionsType = match(restrictions.data.targetGpuType)
    .with('Amd', () => 'AmdGPU')
    .with('Nvidia', () => 'NvidiaGPU')
    .with('Intel', () => 'IntelGPU')
    .otherwise(() => 'AmdGPU');

  const inputType = useMemo(
    () => convertToInput(
      overclockingPresetValues?.$type ?? (gpuRestrictionsType as DeviceType), 
      restrictions?.data, 
      overclockingPresetValues
    ),
    [restrictions?.data, overclockingPresetValues]
  );

  const defaultValues = useMemo(
    () => transformInputToObject(inputType, overclockingPresetValues?.$type ?? (gpuRestrictionsType as DeviceType)),
    [inputType]
  );

  const { control, reset, getValues } = useForm({
    defaultValues,
  });

  const handleChangeValueEnd = () => setOverclocking(
    { $type: overclockingPresetValues?.$type ?? (gpuRestrictionsType as DeviceType), ...getValues() } as OverclockingType
  );

  const handleReset = () => {
    reset(defaultValues)
    handleChangeValueEnd();
  }

  useEffect(() => {
    reset(defaultValues);
    setOverclocking({...getValues(), $type: overclockingPresetValues?.$type} as OverclockingType);
  }, [defaultValues])

  const renderInputs = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ field, value }: { field: any; value: InputValuesType }) => {
      if (value.inputType === 'fanSpeed')
        return <FanTabs field={field} handleChangeValueEnd={handleChangeValueEnd} />

      if (value.inputType === 'checkbox') {
        return (
          <UiField label={value.label} orientation="horizontal" labelprops={{ flex: 1 }}>
            <UiSwitch
              name={field.name}
              value={field.value}
              onCheckedChange={(value) => {
                field.onChange(value.checked)
                handleChangeValueEnd();
              }}
            />
          </UiField>
        )
      }

      if (value.inputType === 'text') {
        return (
          <UiField label={value.label} orientation="horizontal" labelprops={{ flex: 1 }}>
            <UiInput
              w={'300px'}
              h={'28px'}
              name={field.name}
              value={field.value ?? ''}
              onChange={(e) => {
                field.onChange(e.target.value)
                handleChangeValueEnd();
              }}
            />
          </UiField>
        )
      }

      if (value.inputType === 'number') {
        return (
          <UiField label={value.label} orientation="horizontal" labelprops={{ flex: 1 }}>
            <Group>
              <UiInput
                w={'80px'}
                h={'28px'}
                textAlign="right"
                name={field.name}
                value={field.value}
                onChange={(e) => {
                  const number = Number(e.target.value);

                  if (Number.isNaN(number)) return;

                  field.onChange(number)
                  handleChangeValueEnd();
                }}
              />
              {value.unit && <UiText w={8} textAlign="right">{value.unit}</UiText>}
            </Group>
          </UiField>
        )
      }

      return (
        <UiSlider
          label={value.label}
          unit={value.unit}
          showValue
          showMarks
          min={value?.min}
          max={value?.max}
          disabled={!value.isWritable}
          onFocusChange={({ focusedIndex }) => {
            if (focusedIndex !== -1) return
            field.onBlur()
          }}
          name={field.name}
          value={[field.value]}
          onValueChange={({ value }) => {
            field.onChange(value[0]);
          }}
          onValueChangeEnd={handleChangeValueEnd}
        />
      )
    },
    [handleChangeValueEnd]
  );

  return (
    <form>
      <Stack gap={4}>
        {restrictions && map(inputType, (input) => (
          <Stack key={input.label}>
            <HeaderSeparator label={input.label} />
            <Stack gap={4} pl={3} pr={3}>
              {map(input.values, (value) => (
                <Controller
                  key={value.label}
                  control={control}
                  name={camelCase(value.label) as keyof typeof defaultValues}
                  render={({ field }) => renderInputs({ field, value })}
                />
              ))}
            </Stack>
          </Stack>
        ))}
        <Group>
          <UiButton colorPalette={'cancel'} onClick={handleReset} flex={1}>
            Reset to previous
          </UiButton>
        </Group>
      </Stack>
    </form>
  )
}