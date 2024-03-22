import { useCryptoRepository } from "@/entities/crypto";
import { Pool, usePoolRepository } from "@/entities/pool";
import clsx from "clsx";
import styles from './editPoolForm.module.scss';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UiInput } from "@/shared/ui/ui-input";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { UiButton } from "@/shared/ui/ui-button";
import { mapPool } from "@/shared/lib/utils/map-pool";

export type FormInput = {
  domain: string;
  port: string;
  cryptocurrency: string;
};

export function EditPoolForm({
  className,
  pool,
  onClose
} : {
  className?: string,
  pool?: Pool
  onClose: () => void;
}) {
  const { getCryptosList } = useCryptoRepository();

  const { editPool } = usePoolRepository();

  const cryptosList = getCryptosList();

  const { control, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      domain: pool?.domain,
      port: pool?.port.toString(),
      cryptocurrency: pool?.cryptocurrency
    }
  })
  const selectedCrypto = watch('cryptocurrency')
  
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const mapedData = mapPool(data, cryptosList)

    if (!mapedData) return
    if (!pool?.id) return

    editPool(pool.id, mapedData);

    onClose();
  };

  return (
    <div className={clsx(className, styles['edit-form'])}>
      <span className={styles['title']}>Edit the pool</span>
      <form 
        id="edit-pool-form"
        className={styles['edit-form-container']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <UiInput 
          control={control}
          name="domain"
          color="opaqueBlack"
          rules={{ required: true }}
          label="Domain" 
          placeholder="Domain of pool"/>
        <UiInput 
          control={control} 
          name="port"
          color="opaqueBlack"
          rules={{ required: true }} 
          label="Address" 
          placeholder="Port of pool"
        />
        <Controller 
          control={control} 
          name="cryptocurrency"
          rules={{ required: true }}
          render={({ field: {onChange} }) => 
            <UiComboBox
              title="Coin"
              color="opaqueBlack"
              options={cryptosList}
              selectedOption={selectedCrypto}
              selectedOnChange={onChange}
              getOptionLabel={(option) => option.fullName}
              placeholder="Select a coin"
            />
          }
        />
      </form>
      <div className={styles['buttons-container']}>
        <UiButton
          className={styles['button']}
          type="submit" 
          form="edit-pool-form" 
          color="blue" 
          withBorder
        >
          Apply
        </UiButton>
        <UiButton
          className={styles['button']}
          color="red"
          onClick={onClose}
          withBorder
        >
          Cancel
        </UiButton>
      </div>
    </div>
  )
}