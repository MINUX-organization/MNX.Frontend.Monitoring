import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { UiSelect } from "@/shared/ui/ui-select";
import { Crypto, useCryptoQuery } from "@/entities/crypto";
import { UiInput } from "@/shared/ui/ui-input";
import styles from './cryptoForm.module.scss';
import { useQuery } from "react-query";
import { getAvailableAlgorithms } from "@/shared/api/get/getAvailableAlgorithms";
import { UiButton } from "@/shared/ui/ui-button";

type FormInput = Crypto;

export function CryptoForm() {
  const { data : algorithms } = useQuery(['algorithms'], getAvailableAlgorithms);
  const { addCrypto } = useCryptoQuery();
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
    <div className={styles['crypto-form']}>
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
              placeholder="Short Name of Crypto"/>
            <UiInput 
              control={control} 
              name="fullName" 
              rules={{ required: true }} 
              label="Full Name" 
              placeholder="Full Name of Crypto"/>
            <Controller 
              control={control} 
              name="algorithm"
              rules={{ required: true }}
              render={({ field: {onChange} }) => 
                <UiSelect
                  title="Algorithm"
                  selectedOnChange={onChange}
                  selectedValue={selectedAlgorithm}
                  options={algorithms}
                  placeholder="Select an algorithm"
                  renderSelectedValue={(selectedValue) => <span>{selectedValue}</span>}
                  getOptionLabel={(option) => option}/>}
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
