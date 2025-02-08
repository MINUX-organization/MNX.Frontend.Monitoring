import { ButtonProps, Fieldset } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, FieldValues, DefaultValues, Path, FieldErrors, ControllerRenderProps } from "react-hook-form";
import { UiField, UiFormButtonsGroup } from "@/shared/ui";
import { ZodSchema } from "zod";
import _ from "lodash";

export type FormField<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  component: (field: ControllerRenderProps<T, Path<T>>) => React.ReactElement;
};

export type FormConfig<T extends FieldValues> = {
  validationSchema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  fields: FormField<T>[];
  onSubmit: (data: T) => Promise<void> | void;
  isSubmitEnabled?: (errors: FieldErrors<T>) => boolean;
  confirmButtonprops?: ButtonProps;
  cancelButtonprops?: ButtonProps;
};

interface GenericFormProps<T extends FieldValues> {
  config: FormConfig<T>;
  onClose?: () => void;
}

export function GenericForm<T extends FieldValues>({
  config,
  onClose,
}: GenericFormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: zodResolver(config.validationSchema),
    defaultValues: config.defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = async (data: T) => {
    await config.onSubmit(data);
    reset();
    onClose?.();
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          {_.map(config.fields, (fieldPart) => (
            <UiField
              key={fieldPart.name.toString()}
              label={fieldPart.label}
              errorText={errors[fieldPart.name]?.message?.toString()}
              invalid={!!errors[fieldPart.name]}
            >
              <Controller
                name={fieldPart.name}
                control={control}
                render={({ field }) => fieldPart.component(field)}
              />
            </UiField>
          ))}
          <UiFormButtonsGroup
            confirmButtonprops={{
              disabled: !config.isSubmitEnabled?.(errors),
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