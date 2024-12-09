import { UiInput } from "@/shared/ui/ui-input";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './loginForm.module.scss';
import clsx from "clsx";
import { UiButton } from "@/shared/ui/ui-button";
import { useSessionRepository } from "@/entities/session";
import { useLocation, useNavigate } from "react-router";
import { loginApi } from "@/shared/api/auth/login";
import { Link } from "react-router-dom";

export type FormInput = {
  login: string;
  password: string;
}

export function LoginForm({
  className
} : {
  className?: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { saveSession } = useSessionRepository();
  
  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      login: "",
      password: ""
    },
  })
  
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const session = true ? await loginApi(data.login, data.password) : {
      accessToken: 'string',
      refreshToken: 'string',
      refreshExpiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString(),
    }

    saveSession(session);
    
    const { from } = location.state || { from: "/" };
    navigate(from);
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
        Login
      </UiButton>
      <Link to="/signup" className={styles['option']}>{"or signup..."}</Link>
    </form>
  )
}