import { useProfileRepository } from "@/entities/profile";
import { UiButton } from "@/shared/ui/ui-button";
import { UiInput } from "@/shared/ui/ui-input";
import { useForm } from "react-hook-form";
import styles from './editPasswordForm.module.scss';
import clsx from "clsx";

type FormInput = {
  oldPassword: string;
  newPassword: string;
}

export function EditPasswordForm({
  className,
  onClose
} : {
  className?: string;
  onClose?: () => void
}) {
  const { editPassword, profileInfo } = useProfileRepository();
  const { handleSubmit, control } = useForm<FormInput>();

  const submit = async (data: FormInput) => {
    const success = await editPassword({
      newPassword: data.newPassword,
      password: data.oldPassword,
      login: profileInfo!.login,
    });

    if (success) {
      onClose?.();
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={clsx(className, styles['edit-password-form'])}>
      <span className={styles['title']}>Edit nickname</span>
      <UiInput type="password" name="oldPassword" control={control} color="transparent"/>
      <UiInput type="password" name="newPassword" control={control} color="transparent"/>
      <div className={styles['buttons']}>
        <UiButton withBorder color="blue" type="submit">Save</UiButton>
        <UiButton withBorder color="red" onClick={onClose}>Cancel</UiButton>
      </div>
    </form>
  )
}