import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { UiSelect } from "@/shared/ui/ui-select";
import { Crypto } from "@/entities/crypto";
import { UiInput } from "@/shared/ui/ui-input";
import styles from './cryptoForm.module.scss';

const algorithms: string[] = [
  'SHA256',
  'SHA512',
  'MD5',
  'SHA1'
]

type FormInput = Crypto;

export function CryptoForm() {
  const { control, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      shortName: '',
      fullName: '',
      algorithm: algorithms[0]
    }
  })
  const selectedAlgorithm = watch('algorithm');

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)

  return (
    <UiBorderBox className={styles['crypto-form']} topLeft topRight bottomLeft bottomRight>
      <UiBgContainer color="transparent">
        <form onSubmit={handleSubmit(onSubmit)}>
          <UiInput control={control} name="shortName" label="Name" placeholder="Short Name of Crypto"/>
          <UiInput control={control} name="fullName" label="Full Name" placeholder="Full Name of Crypto"/>
          <Controller 
            control={control} 
            name="algorithm"
            render={({ field: {onChange} }) => 
              <UiSelect
                title="Algorithm"
                selectedOnChange={onChange}
                selectedValue={selectedAlgorithm}
                selectedLabel={selectedAlgorithm}
                options={algorithms}
                renderLabel={(selectedLabel) => <span>{selectedLabel}</span>}
                getOptionLabel={(option) => option}/>}
          />
        </form>
      </UiBgContainer>
    </UiBorderBox>
  )
}
