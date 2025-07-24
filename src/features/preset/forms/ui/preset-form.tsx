import { presetRepository, PresetSchema, PresetType } from "@/entities/preset";
import { OverclockingType } from "@/shared/types";
import { FormConfig, GenericForm, UiInput } from "@/shared/ui";
import { isSuccessResponse } from "@/shared/api";
import { match } from "ts-pattern";
import { UiCombobox } from "@/shared/ui/combobox";

const { usePresetMutation } = presetRepository;

export function PresetForm({
  devicesNames,
  defaultValues,
  deviceNameInputDisabled,
  overclocking,
  mode = 'add',
  setDeviceName,
  onClose,
} : {
  devicesNames?: string[];
  defaultValues?: Partial<Omit<PresetType, 'overclocking'>>
  deviceNameInputDisabled?: boolean
  overclocking?: OverclockingType | null
  mode?: 'add' | 'edit'
  setDeviceName?: (deviceName: string) => void
  onClose?: () => void
}) {
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
        <UiCombobox
          items={devicesNames ?? []}
          getLabel={(item) => item}
          onChange={(item) => {
            field.onChange(item); 
            setDeviceName?.(item)
          }}
          selectedItem={field.value}
          disabled={deviceNameInputDisabled}
        />
      )},
    ],
    onSubmit: async (data) => {
      if (!overclocking) return;

      const response = await match(mode)
        .with('add', () => savePreset({ ...data, overclocking }))
        .with('edit', () => editPreset({ id: defaultValues!.id!, ...data, overclocking }))
        .exhaustive();

      if (isSuccessResponse(response))
        onClose?.();
    },
    onReset: () => {
      onClose?.();
    }
  }

  return (
    <GenericForm 
      config={config}
    />
  )
}