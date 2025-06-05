import { CryptocurrencyType } from "@/entities/cryptocurrency";
import { poolRepository, PoolType, PostPoolSchema, PostPoolType } from "@/entities/pool";
import { isSuccessResponse } from "@/shared/api";
import { UiCheckbox, UiInput, UiSelect } from "@/shared/ui";
import { FormConfig, GenericForm } from "@/shared/ui";
import { match } from "ts-pattern";
import find from "lodash/find";
import isEmpty from 'lodash/isEmpty';

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

  const config: FormConfig<PostPoolType> = {
    validationSchema: PostPoolSchema,
    defaultValues: match(pool)
      .with(undefined, () => ({
        domain: '',
        port: '',
        cryptocurrencyId: '',
        tls: false,
      }))
      .otherwise((pool) => ({
        domain: pool.domain,
        port: pool.port.toString(),
        cryptocurrencyId: pool.cryptocurrencyId,
        tls: pool.tls,
      })),
    fields: [
      { name: 'domain', label: 'Domain', component: ({field}) => <UiInput {...field} /> },
      { name: 'port', label: 'Port', component: ({field}) => <UiInput {...field} /> },
      { name: 'cryptocurrencyId', label: 'Cryptocurrency', component: ({field, invalid}) => (
        <UiSelect<CryptocurrencyType>
          invalid={invalid}
          disabled={mode === 'edit'}
          items={cryptocurrencies ?? []}
          getLabel={(item) => item.fullName}
          onChange={(item) => field.onChange(item?.id)}
          selectedItem={find(cryptocurrencies, { id: field.value })}
        />
      )},
      { name: 'tls', label: 'TLS', orientation: 'horizontal', component: ({field}) => 
        <UiCheckbox 
          name={field.name}
          checked={field.value} 
          onCheckedChange={(value) => field.onChange(value.checked)}
        /> 
      }
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
    isSubmitDisabled: (errors) => !isEmpty(errors)
  }

  return (   
    <GenericForm config={config} onClose={onClose}/>
  )
}