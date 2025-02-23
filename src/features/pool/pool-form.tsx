import { CryptocurrencyType } from "@/entities/cryptocurrency";
import { poolRepository, PoolType, PostPoolSchema, PostPoolType } from "@/entities/pool";
import { isSuccessResponse } from "@/shared/api";
import { UiInput, UiSelect } from "@/shared/ui";
import { FormConfig, GenericForm } from "@/shared/ui";
import _ from "lodash";
import { match } from "ts-pattern";

const { usePoolMutation } = poolRepository;

export function PoolForm({
  onClose,
  mode = 'add',
  pool,
  cryptocurrencies,
} : {
  onClose?: () => void
  mode?: 'add' | 'edit'
  pool?: PoolType
  cryptocurrencies?: CryptocurrencyType[]
}) {
  const { addPool, editPool } = usePoolMutation();

  const findedCryptocurrency = _.find(cryptocurrencies, { fullName: pool?.cryptocurrency });

  const config: FormConfig<PostPoolType> = {
    validationSchema: PostPoolSchema,
    defaultValues: match(pool)
      .with(undefined, () => ({
        domain: '',
        port: '',
        cryptocurrencyId: '',
      }))
      .otherwise((pool) => ({
        domain: pool.domain,
        port: pool.port.toString(),
        cryptocurrencyId: findedCryptocurrency?.id,
      })),
    fields: [
      { name: 'domain', label: 'Domain', component: ({field}) => <UiInput {...field} /> },
      { name: 'port', label: 'Port', component: ({field}) => <UiInput {...field} /> },
      { name: 'cryptocurrencyId', label: 'Cryptocurrency', component: ({field, invalid}) => (
        <UiSelect<CryptocurrencyType>
          invalid={invalid}
          items={cryptocurrencies ?? []}
          getLabel={(item) => item.fullName}
          onChange={(item) => field.onChange(item?.id)}
          selectedItem={_.find(cryptocurrencies, { id: field.value })}
        />
      )},
    ],
    onSubmit: async (data) => {
      const response = await match(mode)
        .with('add', () => addPool(data))
        .with('edit', () => editPool({ id: pool!.id, ...data }))
        .exhaustive();

      if (!isSuccessResponse(response)) {
        return;
      }
    },
    isSubmitDisabled: (errors) => !_.isEmpty(errors)
  }

  return (   
    <GenericForm config={config} onClose={onClose}/>
  )
}