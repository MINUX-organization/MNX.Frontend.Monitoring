import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { Wallet, useWalletRepository } from "@/entities/wallet";
import clsx from "clsx";
import styles from './editWalletForm.module.scss';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UiInput } from "@/shared/ui/ui-input";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { mapWallet } from "@/shared/lib/utils/map-wallet";
import { UiButton } from "@/shared/ui/ui-button";
import _ from "lodash";

export type FormInput = {
  name: string;
  address: string;
  cryptocurrency: Crypto;
};

export function EditWalletForm({
  className,
  wallet,
  onClose
} : {
  className?: string,
  wallet?: Wallet
  onClose: () => void;
}) {
  const { getCryptosList } = useCryptoRepository();

  const { editWallet } = useWalletRepository();

  const cryptosList = getCryptosList();

  const { control, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      name: wallet?.name,
      cryptocurrency: _.find(cryptosList, ['fullName', wallet?.cryptocurrency]),
      address: wallet?.address
    }
  })
  const selectedCrypto = watch('cryptocurrency')
  
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const mapedData = mapWallet(data, cryptosList);

    if (!mapedData) return;
    if (!wallet?.id) return;

    const status = await editWallet(wallet.id, mapedData);

    if (!status) return;

    onClose();
  };

  return (
    <div className={clsx(className, styles['edit-form'])}>
      <span className={styles['title']}>Edit the wallet</span>
      <form 
        id="edit-wallet-form"
        className={styles['edit-form-container']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <UiInput 
          control={control} 
          name="name"
          color="opaqueBlack"
          rules={{ required: true }}
          label="Name" 
          placeholder="Name of wallet"/>
        <UiInput 
          control={control} 
          name="address"
          color="opaqueBlack"
          rules={{ required: true }} 
          label="Address" 
          placeholder="Address of wallet"
        />
        <Controller 
          control={control} 
          name="cryptocurrency"
          rules={{ required: true, validate: (value) => !_.isEqual(value, {}) }}
          render={({ field: {onChange} }) => 
            <UiComboBox
              isDisabled
              title="Coin"
              color="opaqueBlack"
              options={cryptosList ?? []}
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
          form="edit-wallet-form" 
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