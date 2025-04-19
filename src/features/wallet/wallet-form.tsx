import { CryptocurrencyType } from "@/entities/cryptocurrency";
import { PostWalletSchema, PostWalletType, WalletType } from "@/entities/wallet";
import { walletRepository } from "@/entities/wallet/model/wallet.repository";
import { isSuccessResponse } from "@/shared/api";
import { UiInput, UiSelect } from "@/shared/ui";
import { FormConfig, GenericForm } from "@/shared/ui";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import { match } from "ts-pattern";

const { useWalletMutation } = walletRepository;

export function WalletForm({
  onClose,
  mode = 'add',
  wallet,
  cryptocurrencies,
} : {
  onClose?: () => void
  mode?: 'add' | 'edit'
  wallet?: WalletType
  cryptocurrencies?: CryptocurrencyType[]
}) {
  const { addWallet, editWallet } = useWalletMutation();

  const findedCryptocurrency = find(cryptocurrencies, { fullName: wallet?.cryptocurrency });

  const config: FormConfig<PostWalletType> = {
    validationSchema: PostWalletSchema,
    defaultValues: match(wallet)
      .with(undefined, () => ({
        name: '',
        address: '',
        cryptocurrencyId: '',
      }))
      .otherwise((wallet) => ({
        name: wallet.name,
        address: wallet.address,
        cryptocurrencyId: findedCryptocurrency?.id,
      })),
    fields: [
      { name: 'name', label: 'Name', component: ({field}) => <UiInput {...field} /> },
      { name: 'address', label: 'Address', component: ({field}) => <UiInput {...field} /> },
      { name: 'cryptocurrencyId', label: 'Cryptocurrency', component: ({field, invalid}) => (
        <UiSelect<CryptocurrencyType>
          invalid={invalid}
          items={cryptocurrencies ?? []}
          getLabel={(item) => item.fullName}
          onChange={(item) => field.onChange(item?.id)}
          selectedItem={find(cryptocurrencies, { id: field.value })}
        />
      )},
    ],
    onSubmit: async (data) => {
      const response = await match(mode)
        .with('add', () => addWallet(data))
        .with('edit', () => editWallet({ id: wallet!.id, ...data }))
        .exhaustive();

      if (!isSuccessResponse(response)) {
        return;
      }
    },
    isSubmitDisabled: (errors) => !isEmpty(errors)
  }

  return (   
    <GenericForm config={config} onClose={onClose}/>
  )
}