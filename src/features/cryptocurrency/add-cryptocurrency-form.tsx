import { algorithmRepository } from "@/entities/algorithm";
import { CryptocurrencySchema, CryptocurrencyType } from "@/entities/cryptocurrency";
import { UiInput, UiSelect } from "@/shared/ui";
import { FormConfig, GenericForm } from "@/shared/ui";
import _ from "lodash";

const { useAlgorithmQuery } = algorithmRepository;

export function AddCryptocurrencyForm() {
  const { algorithms } = useAlgorithmQuery();

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
      { name: 'shortName', label: 'Short name', component: (field) => <UiInput {...field} /> },
      { name: 'fullName', label: 'Full name', component: (field) => <UiInput {...field} /> },
      { name: 'algorithm', label: 'Algorithm', component: (field) => (
        <UiSelect
          items={algorithms ?? []}
          getLabel={(item) => item.name}
          onChange={(item) => field.onChange(item)}
        />
      )},
    ],
    onSubmit: async (data) => {
      console.log(data)
    },
    // isSubmitEnabled: (errors) => {
    //   return !_.isEmpty(errors)
    // },
  }

  return (
    <>    
      <GenericForm config={config} />
      
    </>
  )
}