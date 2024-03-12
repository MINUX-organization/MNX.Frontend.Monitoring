import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { UiInput } from "@/shared/ui/ui-input";
import styles from './walletForm.module.scss';
import { UiButton } from "@/shared/ui/ui-button";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { Wallet, useWalletRepository } from "@/entities/wallet";
import clsx from "clsx";
import _ from "lodash";
import { useCryptoRepository } from "@/entities/crypto";

type FormInput = Wallet;

export function WalletForm({
  className
} : {
  className: string
}) {
  const { addWallet } = useWalletRepository();
  const { getCryptosList } = useCryptoRepository();
  const fullNamesList = _.map(getCryptosList(), 'fullName');

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      name: '',
      cryptocurrency: '',
      address: ''
    }
  })
  const selectedCrypto = watch('cryptocurrency');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    addWallet(data);
    reset();
  };

  return (
    <div className={clsx(className, styles['wallet-form'])}>
      <UiBorderBox topLeft topRight bottomLeft bottomRight>
        <UiBgContainer className={styles['wallet-container']} color="transparent">
          <span className={styles['title']}>Add new wallet</span>
          <form 
            id="wallet-form" 
            className={styles['wallet-form-container']} 
            onSubmit={handleSubmit(onSubmit)}
          >
            <UiInput 
              control={control} 
              name="name"
              rules={{ required: true }}
              label="Name" 
              placeholder="Name of wallet"/>
            <Controller 
              control={control} 
              name="cryptocurrency"
              rules={{ required: true }}
              render={({ field: {onChange} }) => 
                <UiComboBox
                  title="Coin"
                  options={fullNamesList}
                  selectedOption={selectedCrypto}
                  selectedOnChange={onChange}
                  getOptionLabel={(option) => option?.toString() || ''}
                  placeholder="Select an coin"
                />
              }
            /> 
            <UiInput 
              control={control} 
              name="address" 
              rules={{ required: true }} 
              label="Address" 
              placeholder="Address of wallet"
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
