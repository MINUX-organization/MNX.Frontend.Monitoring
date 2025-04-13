import { ButtonProps, Fieldset } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, DefaultValues, Path, FieldErrors, Controller } from "react-hook-form";
import { UiField, UiFormButtonsGroup } from "@/shared/ui";
import { ZodSchema } from "zod";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";

export type FormField<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ({field, invalid}: { field: any; invalid: boolean }) => React.ReactElement;
};

export type FormConfig<T extends FieldValues> = {
  validationSchema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  fields: FormField<T>[];
  onSubmit: (data: T) => Promise<void> | void;
  onReset?: () => void;
  isSubmitDisabled?: (errors: FieldErrors<T>) => boolean;
  confirmButtonprops?: ButtonProps;
  cancelButtonprops?: ButtonProps;
};

interface GenericFormProps<T extends FieldValues> {
  config: FormConfig<T>;
  onClose?: () => void;
  disableCancelButton?: boolean;
}

export function GenericForm<T extends FieldValues>({
  config,
  onClose,
  disableCancelButton
}: GenericFormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<T>({
    resolver: zodResolver(config.validationSchema),  
    defaultValues: config.defaultValues,
    mode: "onChange",
  });

  const watchedValues = map(config.fields, (fieldPart) => watch(fieldPart.name));

  const handleFormSubmit = async (data: T) => {
    await config.onSubmit(data);
    handleCancel();
  };

  const handleCancel = () => {
    onClose?.();
    reset();
    config.onReset?.();
  };

  const isDisabled = (config.isSubmitDisabled?.(errors) ?? false) || 
  map(watchedValues, (fieldPart) => {
    if (typeof fieldPart === 'number') {
      return isEmpty(fieldPart.toString());
    }

    return isEmpty(fieldPart);
  }).includes(true);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          {map(config.fields, (fieldPart) => (
            <UiField
              key={fieldPart.name.toString()}
              label={fieldPart.label}
              errorText={errors[fieldPart.name]?.message?.toString()}
              invalid={!!errors[fieldPart.name]}
              className="group"
            >
              <Controller
                control={control}
                name={fieldPart.name}
                render={({ field }) => fieldPart.component({ field, invalid: !!errors[fieldPart.name] })}
              />
            </UiField>
          ))}
          <UiFormButtonsGroup
            disableCancelButton={disableCancelButton}
            mt={4}
            confirmButtonprops={{
              disabled: isDisabled,
              ...config.confirmButtonprops
            }}
            cancelButtonprops={{
              onClick: handleCancel,
              ...config.cancelButtonprops
            }}
          />
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}