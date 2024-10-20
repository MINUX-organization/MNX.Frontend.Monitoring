import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { UiInput } from "@/shared/ui/ui-input";
import styles from './poolForm.module.scss';
import { UiButton } from "@/shared/ui/ui-button";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { usePoolRepository } from "@/entities/pool";
import clsx from "clsx";
import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { mapPool } from "@/shared/lib/utils/map-pool";
import _ from "lodash";

export type FormInput = {
  domain: string;
  port: string;
  cryptocurrency: Crypto;
};

export function PoolForm({
  className
} : {
  className: string
}) {
  const { addPool } = usePoolRepository();
  const { getCryptosList } = useCryptoRepository();
  const cryptosList = getCryptosList();

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      domain: '',
      port: '',
      cryptocurrency: {},
    }
  })
  const selectedCrypto = watch('cryptocurrency')
  
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const mapedData = mapPool(data, cryptosList);

    if (!mapedData) return;

    const status = await addPool(mapedData);

    if (!status) return;

    reset();
  };

  return (
    <div className={clsx(className, styles['pool-form'])}>
      <UiBorderBox topLeft topRight bottomLeft bottomRight>
        <UiBgContainer className={styles['pool-container']} color="transparent">
          <span className={styles['title']}>Add new pool</span>
          <form 
            id="pool-form" 
            className={styles['pool-form-container']} 
            onSubmit={handleSubmit(onSubmit)}
          >
            <UiInput 
              control={control} 
              name="domain"
              color="opaque"
              rules={{ required: true }}
              label="Domain" 
              placeholder="Domain of pool"/>
            <UiInput 
              control={control} 
              name="port"
              color="opaque"
              rules={{ required: true }} 
              label="Port" 
              placeholder="Port of pool"
            />
            <Controller 
              control={control} 
              name="cryptocurrency"
              rules={{ required: true, validate: (value) => !_.isEqual(value, {}) }}
              render={({ field: {onChange} }) => 
                <UiComboBox
                  title="Coin"
                  options={cryptosList ?? []}
                  selectedOption={selectedCrypto}
                  selectedOnChange={onChange}
                  getOptionLabel={(option) => option.fullName}
                  placeholder="Select a coin"
                />
              }
            />
          </form>
        </UiBgContainer>
      </UiBorderBox>
      <UiButton
        className={styles['button-submit']}
        type="submit" 
        form="pool-form" 
        color="blue" 
        withBorder
      >
        <span>Add</span>
      </UiButton>
    </div>
  )
}
