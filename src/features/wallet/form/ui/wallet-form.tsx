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
import _ from "lodash";

function mapWallet(data: FormInput, cryptosList?: Crypto[]) {
  const findedCrypto = _.find(cryptosList, ['fullName', data.cryptocurrency])
  if (!findedCrypto) return
  return {
    name: data.name,
    address: data.address,
    cryptocurrencyId: findedCrypto.id
  }
}

type FormInput = {
  name: string;
  cryptocurrency: string;
  address: string;
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
      cryptocurrency: '',
      address: ''
    }
  })
  const selectedCrypto = watch('cryptocurrency')
  
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const mapedData = mapWallet(data, cryptosList)
    console.log(mapedData)
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
                  options={cryptosList}
                  selectedOption={selectedCrypto}
                  selectedOnChange={onChange}
                  getOptionLabel={(option) => option.fullName}
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
        form="wallet-form" 
        color="blue" 
        withBorder
      >
        <span>Add</span>
      </UiButton>
    </div>
  )
}
