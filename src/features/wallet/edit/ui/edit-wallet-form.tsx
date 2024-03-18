import { useCryptoRepository } from "@/entities/crypto";
import { Wallet } from "@/entities/wallet";
import clsx from "clsx";
import styles from './editWalletForm.module.scss';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UiInput } from "@/shared/ui/ui-input";
import { UiComboBox } from "@/shared/ui/ui-combobox";

export type FormInput = {
  name: string;
  cryptocurrency: string;
  address: string;
};

export function EditWalletForm({
  className,
  wallet
} : {
  className?: string,
  wallet?: Wallet
}) {
  const { getCryptosList } = useCryptoRepository();
  const cryptosList = getCryptosList();

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      name: wallet?.name,
      cryptocurrency: wallet?.cryptocurrency,
      address: wallet?.address
    }
  })
  const selectedCrypto = watch('cryptocurrency')
  
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    reset();
  };

  return (
    <form 
      id="edit-wallet-form"
      className={clsx(className, styles['edit-form'])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <UiInput 
        control={control} 
        name="name"
        rules={{ required: true }}
        label="Name" 
        placeholder="Name of wallet"/>
      <UiInput 
        control={control} 
        name="address" 
        rules={{ required: true }} 
        label="Address" 
        placeholder="Address of wallet"
      />
      <Controller 
        control={control} 
        name="cryptocurrency"
        rules={{ required: true }}
        render={({ field: {onChange} }) => 
          <UiComboBox
            title="Coin"
            options={cryptosList}
            selectedOption={selectedCrypto}
            selectedOnChange={onChange}
            getOptionLabel={(option) => option.fullName}
            placeholder="Select a coin"
          />
        }
      />
    </form>
  )
}