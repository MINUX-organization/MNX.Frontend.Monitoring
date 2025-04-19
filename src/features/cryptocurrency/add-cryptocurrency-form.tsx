import { algorithmRepository, AlgorithmType } from "@/entities/algorithm";
import { cryptocurrencyRepository, PostCryptocurrencySchema, PostCryptocurrencyType } from "@/entities/cryptocurrency";
import { isSuccessResponse } from "@/shared/api";
import { UiInput, UiSelect } from "@/shared/ui";
import { FormConfig, GenericForm } from "@/shared/ui";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";

const { useAlgorithmQuery } = algorithmRepository;
const { useCryptocurrencyMutation } = cryptocurrencyRepository;

export function AddCryptocurrencyForm({
  onClose
} : {
  onClose?: () => void
}) {
  const { algorithms } = useAlgorithmQuery();
  const { addCryptocurrency } = useCryptocurrencyMutation();

  const config: FormConfig<PostCryptocurrencyType> = {
    validationSchema: PostCryptocurrencySchema,
    defaultValues: {
      shortName: '',
      fullName: '',
      algorithmId: ''
    },
    fields: [
      { name: 'shortName', label: 'Short name', component: ({field}) => <UiInput {...field} /> },
      { name: 'fullName', label: 'Full name', component: ({field}) => <UiInput {...field} /> },
      { name: 'algorithmId', label: 'Algorithm', component: ({field, invalid}) => (
        <UiSelect<AlgorithmType>
          invalid={invalid}
          items={algorithms ?? []}
          getLabel={(item) => item.name}
          onChange={(item) => field.onChange(item?.id)}
          selectedItem={find(algorithms, { id: field.value })}
        />
      )},
    ],
    onSubmit: async (data) => {
      const response = await addCryptocurrency(data);

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