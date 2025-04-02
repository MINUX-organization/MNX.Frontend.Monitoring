/* eslint-disable react-hooks/exhaustive-deps */
import { gpuRestrictionsOptions } from "@/entities/devices"
import { HeaderSeparator, UiButton } from "@/shared/ui"
import { Group, Stack } from "@chakra-ui/react"
import { convertToSliders } from "../utils/convert-to-sliders-values"
import { OverclockingGpuType } from "@/entities/preset"
import _ from "lodash"
import { UiSlider } from "@/shared/ui/slider"
import { Controller, useForm } from "react-hook-form"
import { transformSlidersToObject } from "../utils/transformSlidersToObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo } from "react"

export function PresetSlidersForm({
  overclockingPresetValues,
  setOverclocking,
  deviceIdOrName
} : {
  overclockingPresetValues?: OverclockingGpuType
  setOverclocking: (overclocking: Omit<OverclockingGpuType, '$type'>) => void
  deviceIdOrName?: string
}) {
  const { data: restrictions } = useSuspenseQuery(gpuRestrictionsOptions(deviceIdOrName));

  const sliderType = useMemo(
    () => convertToSliders(restrictions?.data, overclockingPresetValues),
    [restrictions?.data, overclockingPresetValues]
  )

  const defaultValues = useMemo(
    () => transformSlidersToObject(sliderType),
    [sliderType]
  )

  const { control, reset, getValues } = useForm({
    defaultValues,
  })

  const handleChangeValueEnd = () => setOverclocking(getValues());

  const handleReset = () => {
    reset(defaultValues)
    handleChangeValueEnd();
  }

  const handleResetToDefault = () => {
    const restrictionsSlider = convertToSliders(restrictions?.data)
    const object = transformSlidersToObject(restrictionsSlider);
    reset(object);
    handleChangeValueEnd();
  }

  useEffect(() => {
    reset(defaultValues);
    setOverclocking(defaultValues);
  }, [defaultValues])

  const renderSlider = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ field, value }: { field: any; value: any }) => (
      <UiSlider
        label={value.label}
        showValue
        showMarks
        min={value.min}
        max={value.max}
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
    ),
    [handleChangeValueEnd]
  );

  return (
    <form>
      <Stack gap={4}>
        {restrictions && _.map(sliderType, (slider) => (
          <Stack key={slider.label}>
            <HeaderSeparator label={slider.label} />
            <Stack gap={4} pl={3} pr={3}>
              {_.map(slider.values, (value) => (
                <Controller
                  key={value.label}
                  control={control}
                  name={_.camelCase(value.label) as keyof typeof defaultValues}
                  render={({ field }) => renderSlider({ field, value })}
                />
              ))}
            </Stack>
          </Stack>
        ))}
        <Group>
          <UiButton colorPalette={'cancel'} onClick={handleReset} flex={1}>
            Reset to previous
          </UiButton>
          <UiButton colorPalette={'cancel'} onClick={handleResetToDefault} flex={1}>
            Reset to default
          </UiButton>
        </Group>
      </Stack>
    </form>
  )
}