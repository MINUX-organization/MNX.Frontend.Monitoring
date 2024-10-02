import { getCardsNameList } from "@/shared/api/get/getGpusNameList";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { UiInput } from "@/shared/ui/ui-input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import styles from './presetForm.module.scss';
import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { usePresetRepository } from "@/entities/preset";
import { toPreset } from "../utils/to-preset";
import { useEffect } from "react";
import { usePresetStateStore } from "@/widgets/preset-modal/model";

export type FormInput = {
  presetName: string;
  cardName: string;
};

export function PresetForm({
  gpuId,
  label,
  className,
} : {
  gpuId?: string;
  label?: string;
  className?: string;
}) {
  const { addPreset } = usePresetRepository()
  const { setGpuName, selectedPreset, selectedGpuName, slidersParameters } = usePresetStateStore();
  const { data: cardsNameList } = useQuery(['cardsNameList'], () => getCardsNameList());

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      presetName: selectedPreset?.name ?? '',
      cardName: selectedGpuName ?? '',
    }
  })
  const selectedCard = watch('cardName')

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (!slidersParameters) return

    const preset = toPreset(data.presetName, data.cardName, slidersParameters);

    reset();
  };

  useEffect(() => {
    setGpuName(selectedCard)
  }, [selectedCard])
  
  return (
    <div className={clsx(className, styles['preset-form-wrapper'])}>
      <span className={styles['label']}>{label}</span>
      <form 
        className={styles['preset-form']}
        id="preset-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <UiInput
          control={control}
          label="Preset name"
          name="presetName"
          placeholder="Enter preset name"
        />
        <Controller 
          control={control} 
          name="cardName"
          rules={{ required: true }}
          render={({ field: {onChange} }) => 
            <UiComboBox
              title="Card name"
              options={cardsNameList ?? ['NVIDIA GeForce RTX 3080', 'NVIDIA GeForce RTX 3090']}
              selectedOption={selectedCard}
              selectedOnChange={(option) => onChange(option)}
              getOptionLabel={(option) => option}
              placeholder="Select a card"
              isDisabled={Boolean(selectedPreset || gpuId)}
            />
          }
        />
      </form>
      <div className={styles['buttons']}>
        {selectedPreset && <UiButton
          className={styles['button']}
          color="red"
          withBorder  
        >
          Cancel
        </UiButton>}

        <UiButton
          className={styles['button']}
          type="submit" 
          form="preset-form" 
          color="blue" 
          withBorder
        >
          {selectedPreset ? 'Edit' : 'Save'}
        </UiButton>
      </div>
    </div>
  )
}