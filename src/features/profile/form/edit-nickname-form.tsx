import { useProfileRepository } from "@/entities/profile";
import { UiButton } from "@/shared/ui/ui-button";
import { UiInput } from "@/shared/ui/ui-input";
import { useForm } from "react-hook-form";
import styles from './editNicknameForm.module.scss';
import clsx from "clsx";

type FormInput = {
  nickname: string
}

export function EditNicknameForm({
  className,
  nickname,
  onClose,
} : {
  className?: string;
  nickname?: string
  onClose?: () => void
}) {
  const { editNickname } = useProfileRepository();
  const { handleSubmit, control, reset } = useForm<FormInput>({
    defaultValues: {
      nickname,
    }
  });

  const submit = async (data: FormInput) => {
    const success = await editNickname(data.nickname);

    if (!success) return;
    
    reset();
    onClose?.();
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={clsx(className, styles['edit-nickname-form'])}>
      <span className={styles['title']}>Edit nickname</span>
      <UiInput name="nickname" control={control} color="transparent"/>
      <div className={styles['buttons']}>
        <UiButton className={styles['button']} withBorder color="blue" type="submit">Save</UiButton>
        <UiButton className={styles['button']} withBorder color="red" onClick={onClose}>Cancel</UiButton>
      </div>
    </form>
  )
}