/* eslint-disable react-hooks/exhaustive-deps */
import { gpuRestrictionsOptions } from "@/entities/devices"
import { HeaderSeparator, UiButton } from "@/shared/ui"
import { Stack } from "@chakra-ui/react"
import { convertToSliders } from "../utils/convert-to-sliders-values"
import { OverclockingGpuType } from "@/entities/preset"
import _ from "lodash"
import { UiSlider } from "@/shared/ui/slider"
import { Controller, useForm } from "react-hook-form"
import { transformSlidersToObject } from "../utils/transformSlidersToObject"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useState } from "react"
import { presetFormStore } from "../model/preset-form.store"

export function PresetSlidersForm({
  // context = 'preset',
  overclockingPresetValues,
} : {
  context?: 'preset' | 'device',
  overclockingPresetValues?: OverclockingGpuType
}) {
  const { setOverclocking, deviceName } = presetFormStore();
  const { data: restrictions } = useSuspenseQuery(gpuRestrictionsOptions(deviceName));

  const [savedRestrictions] = useState(restrictions.data);

  const sliderType = useMemo(
    () => {
      if (_.isEqual(restrictions.data, savedRestrictions)) {
        return convertToSliders(savedRestrictions, overclockingPresetValues);
      }

      return convertToSliders(restrictions.data)
    },
    [restrictions.data, overclockingPresetValues]
  )

  const defaultValues = useMemo(
    () => transformSlidersToObject(sliderType),
    [sliderType]
  )

  const { control, reset, handleSubmit, getValues } = useForm({
    defaultValues,
  })

  const handleSubmitForm = (data: typeof defaultValues) => {
    console.log(data)
  }

  const handleChangeValueEnd = () => setOverclocking(getValues());

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
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Stack gap={4}>
        {_.map(sliderType, (slider) => (
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
        <UiButton colorPalette={'cancel'} onClick={() => reset(defaultValues)}>
          Reset
        </UiButton>
      </Stack>
    </form>
  )
}