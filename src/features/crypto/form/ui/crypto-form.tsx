import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { UiInput } from "@/shared/ui/ui-input";
import styles from './cryptoForm.module.scss';
import { useQuery } from "react-query";
import { getAvailableAlgorithmsApi } from "@/shared/api";
import { UiButton } from "@/shared/ui/ui-button";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import clsx from "clsx";

type FormInput = Crypto;

export function CryptoForm({
  className
} : {
  className?: string
}) {
  const { addCrypto } = useCryptoRepository();
  const { data : algorithms } = useQuery(['algorithms'], getAvailableAlgorithmsApi);

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      shortName: '',
      fullName: '',
      algorithm: ''
    }
  })
  const selectedAlgorithm = watch('algorithm');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    addCrypto.mutate(data);
    reset();
  };

  return (
    <div className={clsx(className, styles['crypto-form'])}>
      <UiBorderBox topLeft topRight bottomLeft bottomRight>
        <UiBgContainer className={styles['crypto-container']} color="transparent">
          <span className={styles['title']}>Add new coin</span>
          <form 
            id="crypto-form" 
            className={styles['crypto-form-container']} 
            onSubmit={handleSubmit(onSubmit)}
          >
            <UiInput 
              control={control} 
              name="shortName"
              rules={{ required: true }}
              label="Name" 
              placeholder="Short name of crypto"/>
            <UiInput 
              control={control} 
              name="fullName" 
              rules={{ required: true }} 
              label="Full name" 
              placeholder="Full name of crypto"/>
            <Controller 
              control={control} 
              name="algorithm"
              rules={{ required: true }}
              render={({ field: {onChange} }) => 
                <UiComboBox
                  title="Algorithm"
                  options={algorithms}
                  selectedOption={selectedAlgorithm}
                  selectedOnChange={onChange}
                  getOptionLabel={(option) => option?.toString() || ''}
                  placeholder="Select an algorithm"
                />
              }
            /> 
          </form>
        </UiBgContainer>
      </UiBorderBox>
      <UiButton
        className={styles['button-submit']}
        type="submit" 
        form="crypto-form" 
        color="blue" 
        withBorder
      >
        <span>Add</span>
      </UiButton>
    </div>
  )
}
