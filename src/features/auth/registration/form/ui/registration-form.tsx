import { UiButton } from "@/shared/ui/ui-button";
import { UiInput } from "@/shared/ui/ui-input";
import styles from './registrationForm.module.scss';
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { registrationApi } from "@/shared/api/auth/registration";
import { useSessionRepository } from "@/entities/session";
import { useNavigate } from "react-router";
import { ROUTER_PATHS } from "@/shared/constants/routes";

export type FormInput = {
  login: string;
  password: string;
}

export function RegistrationForm({
  className,
} : {
  className?: string;
}) {
  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      login: "",
      password: ""
    },
  })

  const { saveSession } = useSessionRepository();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const session = true ? await registrationApi(data.login, data.password) : {
      accessToken: 'string',
      refreshToken: 'string',
      refreshExpiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString(),
    }

    saveSession(session);
    
    navigate(ROUTER_PATHS.MONITORING);
  }

  return (
    <form className={clsx(
      className,
      styles['form']
    )} onSubmit={handleSubmit(onSubmit)}>
      <UiInput 
        control={control}
        className={styles['input']}
        name="login"
        color="opaqueBlack"
        rules={{ required: true }}
        label="Login" 
        placeholder="Your login"/>
      <UiInput 
        control={control}
        className={styles['input']}
        name="password"
        type="password"
        color="opaqueBlack"
        rules={{ required: true }}
        label="Password" 
        placeholder="Your password"/>
      <UiButton className={styles['button']} color="blue" type="submit">
        Signup
      </UiButton>
    </form>
  )
}