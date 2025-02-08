import { CryptocurrencySchema, CryptocurrencyType } from "@/entities/cryptocurrency";
import { UiInput } from "@/shared/ui";
import { FormConfig, GenericForm } from "@/shared/ui/generic-form";

export function AddCryptocurrencyForm() {
  const config: FormConfig<CryptocurrencyType> = {
    validationSchema: CryptocurrencySchema,
    defaultValues: {
      shortName: '',
      fullName: '',
      algorithm: {
        id: '',
        name: '',
      }
    },
    fields: [
      { name: 'shortName', label: 'Short name', component: (fields) => <UiInput {...fields} /> },
      { name: 'fullName', label: 'Full name', component: (fields) => <UiInput {...fields} /> },
      { name: 'algorithm.name', label: 'Algorithm', component: (fields) => <UiInput {...fields} /> },
    ],
    onSubmit: async (data) => {
      console.log(data)
    }

  }

  return (
    <GenericForm config={config} />
  )
}