import { getCardsNameList } from "@/shared/api/get/getGpusNameList";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { UiInput } from "@/shared/ui/ui-input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import styles from './presetForm.module.scss';
import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { usePresetByGpuNameRepository, usePresetRepository } from "@/entities/preset";
import { toPreset } from "../utils/to-preset";
import { useEffect } from "react";
import { usePresetStateStore } from "@/widgets/preset-modal/model";
import { State } from "@/widgets/preset-modal";
import _ from "lodash";

export type FormInput = {
  presetName: string;
  deviceName: string;
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
  const { addPreset, editPreset } = usePresetRepository()
  const { addPresetToList } = usePresetByGpuNameRepository();
  const { editPresetInList } = usePresetByGpuNameRepository();

  const { 
    setGpuName, 
    selectedPreset, 
    selectedGpuName, 
    slidersParameters, 
    setPreset,
    setModalState,
    modalState } = usePresetStateStore();

  const { data: cardsNameList } = useQuery(['cardsNameList'], () => getCardsNameList());

  const { control, handleSubmit, watch, setValue} = useForm<FormInput>({
    defaultValues: {
      presetName: '',
      deviceName: '',
    },
  })
  const selectedCard = watch('deviceName')

  useEffect(() => {
    setValue('deviceName', selectedGpuName ?? '')
    setValue('presetName', selectedPreset?.name ?? '')
  }, [selectedPreset])

  useEffect(() => {
    setGpuName(selectedCard)
  }, [selectedCard])

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!slidersParameters) return

    const preset = toPreset(data.presetName, data.deviceName, slidersParameters);

    if (modalState === State.Editing && selectedPreset) {
      const isSuccess = await editPreset(selectedPreset.id, preset);

      if (!isSuccess) return;

      editPresetInList(selectedPreset.id, preset)
      setModalState(State.Idle)
    }

    if (modalState === State.Creating) {
      const { isSuccess, data } = await addPreset(preset)

      if (!isSuccess) return;

      setPreset(data)
      addPresetToList(data)
      setModalState(State.Idle)
    }
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
          rules={{ required: true }}
          disabled={modalState === State.Idle}
          label="Preset name"
          name="presetName"
          placeholder="Enter preset name"
        />
        <Controller 
          control={control} 
          name="deviceName"
          rules={{ required: true, validate: (value) => !_.isEqual(value, {}) }}
          render={({ field: {onChange} }) => 
            <UiComboBox
              title="Card name"
              options={cardsNameList ?? []}
              selectedOption={selectedCard}
              selectedOnChange={onChange}
              getOptionLabel={(option) => option}
              placeholder="Select a card"
              isDisabled={Boolean(selectedPreset || gpuId)}
            />
          }
        />
      </form>
      {<div className={styles['buttons']}>
        {modalState === State.Editing && <UiButton
          className={styles['button']}
          color="red"
          withBorder
          onClick={() => setModalState(State.Idle)}
        >
          Cancel
        </UiButton>}
        {modalState !== State.Idle && <UiButton
          className={styles['button']}
          type="submit" 
          form="preset-form" 
          color="blue" 
          withBorder
        >
          {selectedPreset ? 'Edit' : 'Save'}
        </UiButton>}
      </div>}
    </div>
  )
}