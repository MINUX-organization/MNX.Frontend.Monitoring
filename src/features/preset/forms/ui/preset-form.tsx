import { presetRepository, PresetSchema, PresetType } from "@/entities/preset";
import { FormConfig, GenericForm, UiInput, UiSelect } from "@/shared/ui";
import { presetFormStore } from "../model/preset-form.store";
import { isSuccessResponse } from "@/shared/api";
import { useNavigate } from "@tanstack/react-router";
import { match } from "ts-pattern";

const { usePresetMutation } = presetRepository;

export function PresetForm({
  devicesNames,
  defaultValues,
} : {
  devicesNames: string[];
  defaultValues?: Partial<Omit<PresetType, 'overclocking'>>
}) {
  const navigate = useNavigate();
  const { setDeviceName, overclocking, mode } = presetFormStore();
  const { savePreset, editPreset } = usePresetMutation();

  const config: FormConfig<Omit<Omit<PresetType, 'overclocking'>, 'id'>>  = {
    validationSchema: PresetSchema.omit({ overclocking: true, id: true }),
    defaultValues: match(defaultValues)
      .when((defaultValues) => defaultValues !== undefined, (defaultValues) => {
        return {
          name: defaultValues.name,
          deviceName: defaultValues.deviceName,
        }
      })
      .otherwise(() => ({ name: '', deviceName: '' })),
    fields: [
      { name: 'name', label: 'Name', component: ({field}) => <UiInput {...field} /> },
      { name: 'deviceName', label: 'Device name', component: ({field}) => (
        <UiSelect
          items={devicesNames}
          getLabel={(item) => item}
          onChange={(item) => {
            field.onChange(item);
            setDeviceName(item);
          }}
          selectedItem={field.value}
        />
      )},
    ],
    onSubmit: async (data) => {
      if (!overclocking) return;

      const response = await match(mode)
        .with('add', () => savePreset({ ...data, overclocking: { $type: 'GPU', ...overclocking } }))
        .with('edit', () => editPreset({ id: defaultValues!.id!, ...data, overclocking: { $type: 'GPU', ...overclocking } }))
        .exhaustive();

      if (isSuccessResponse(response))
        navigate({ to: '..' });
    },
    onReset: () => {
      if (mode === 'edit') 
        navigate({ to: '/setup/presets' });

      setDeviceName('');
    }
  }

  return (
    <GenericForm 
      config={config}
    />
  )
}