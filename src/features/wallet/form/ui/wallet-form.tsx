import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { UiInput } from "@/shared/ui/ui-input";
import styles from './walletForm.module.scss';
import { UiButton } from "@/shared/ui/ui-button";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { useWalletRepository } from "@/entities/wallet";
import clsx from "clsx";
import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { mapWallet } from "@/shared/lib/utils/map-wallet";

export type FormInput = {
  name: string;
  address: string;
  cryptocurrency: Crypto;
};

export function WalletForm({
  className
} : {
  className: string
}) {
  const { addWallet } = useWalletRepository();
  const { getCryptosList } = useCryptoRepository();
  const cryptosList = getCryptosList();

  const { control, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      name: '',
      address: '',
      cryptocurrency: {},
    }
  })
  const selectedCrypto = watch('cryptocurrency')
  
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const mapedData = mapWallet(data, cryptosList)

    if (!mapedData) return

    addWallet(mapedData);

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
              color="opaque"
              rules={{ required: true }}
              label="Name" 
              placeholder="Name of wallet"/>
            <UiInput 
              control={control} 
              name="address"
              color="opaque"
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
        form="wallet-form" 
        color="blue" 
        withBorder
      >
        Add
      </UiButton>
    </div>
  )
}
