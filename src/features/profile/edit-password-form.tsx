import { ChangePasswordSchema, ChangePasswordType, profileRepository } from "@/entities/profile";
import { isSuccessResponse } from "@/shared/api";
import { UiField, UiFormButtonsGroup, UiPasswordInput } from "@/shared/ui";
import { Fieldset } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import isEmpty from "lodash/isEmpty";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const { useProfileMutation } = profileRepository;

interface EditPasswordFormProps extends Fieldset.ContentProps {
  onClose?: () => void
}

export function EditPasswordForm({ onClose, ...props }: EditPasswordFormProps) {
  const { formState: { errors }, handleSubmit, control, getValues, reset } = useForm<ChangePasswordType>({
    defaultValues: {
      password: '',
      newPassword: '',
    },
    mode: 'onChange',
    resolver: zodResolver(ChangePasswordSchema)
  })
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { changePassword } = useProfileMutation();

  const handleSubmitChangePassword = async (data: ChangePasswordType) => {
    const response = await changePassword(data);

    if (isSuccessResponse(response)) {
      reset();
      onClose?.();
    }
  }

  const handleCancelClick = () => {
    reset();
    onClose?.();
  }

  const isInvalidPasswordConfirm = !isEmpty(passwordConfirm) && getValues('newPassword') !== passwordConfirm;

  return (
    <form onSubmit={handleSubmit(handleSubmitChangePassword)}>
      <Fieldset.Root>
        <Fieldset.Content {...props}>
          <UiField label={"Current password"} errorText={errors.password?.message} invalid={!!errors.password}>
            <Controller 
              name="password"
              control={control}
              render={({ field }) => (
                <UiPasswordInput {...field} />
              )}
            />
          </UiField>
          <UiField label={"New password"} errorText={errors.newPassword?.message} invalid={!!errors.newPassword}>
            <Controller 
              name="newPassword"
              control={control}
              render={({ field }) => (
                <UiPasswordInput {...field} />
              )}
            />
          </UiField>
          <UiField label={"Confirm password"} errorText={"Passwords do not match"} invalid={isInvalidPasswordConfirm}>
            <UiPasswordInput onChange={(e) => setPasswordConfirm(e.target.value)} />
          </UiField>
        </Fieldset.Content>
        <UiFormButtonsGroup 
          confirmButtonprops={{
            disabled: 
              Object.keys(errors).length > 0 || 
              isInvalidPasswordConfirm 
              || passwordConfirm === '' 
              || getValues('password') === ''
              || getValues('newPassword') === ''
          }}
          cancelButtonprops={{
            onClick: handleCancelClick
          }}
        />
      </Fieldset.Root>
    </form>
  )

}