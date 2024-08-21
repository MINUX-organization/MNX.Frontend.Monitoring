import { getCardsNameList } from "@/shared/api/get/getCardsNameList";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { UiInput } from "@/shared/ui/ui-input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import styles from './presetForm.module.scss';
import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { usePresetRepository } from "@/entities/preset";

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

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      presetName: '',
      cardName: '',
    }
  })

  const { data: cardsNameList } = useQuery(['cardsNameList'], () => getCardsNameList());

  const selectedCard = watch('cardName')

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    addPreset(data);

    reset();
  };
  
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
              title="Card Name"
              options={cardsNameList}
              selectedOption={selectedCard}
              selectedOnChange={onChange}
              getOptionLabel={(option) => option}
              placeholder="Select a card"
              isDisabled={Boolean(gpuId)}
            />
          }
        />
      </form>
      <UiButton
        className={styles['button-submit']}
        type="submit" 
        form="preset-form" 
        color="blue" 
        withBorder
      >
        Save
      </UiButton>
    </div>
  )
}