import { ButtonProps, Fieldset } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, FieldValues, DefaultValues, Path, FieldErrors } from "react-hook-form";
import { UiField, UiFormButtonsGroup, UiInput } from "@/shared/ui";
import { ComponentType } from "react";
import { ZodSchema } from "zod";

export type FormField<T> = {
  name: keyof T;
  label: string;
  component: ComponentType<unknown>;
  props?: Record<string, unknown>;
};

export type FormConfig<T extends FieldValues> = {
  validationSchema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  fields: FormField<T>[];
  onSubmit: (data: T) => Promise<void> | void;
  isSubmitEnabled?: (errors: FieldErrors<T>) => boolean;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
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
          {config.fields.map((field) => (
            <UiField
              key={field.name.toString()}
              label={field.label}
              errorText={errors[field.name]?.message?.toString()}
              invalid={!!errors[field.name]}
            >
              <Controller
                name={field.name.toString() as Path<T>}
                control={control}
                render={({ field }) => (
                  <UiInput
                    {...field}
                  />
                )}
              />
            </UiField>
          ))}
          <UiFormButtonsGroup
            confirmButtonprops={{
              disabled: !config.isSubmitEnabled?.(errors),
              ...config.confirmButtonProps
            }}
            cancelButtonprops={{
              onClick: handleCancel,
              ...config.cancelButtonProps
            }}
          />
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}