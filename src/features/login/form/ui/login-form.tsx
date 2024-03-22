import { UiInput } from "@/shared/ui/ui-input";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './loginForm.module.scss';
import clsx from "clsx";
import { UiButton } from "@/shared/ui/ui-button";
import { Session, useSessionRepository } from "@/entities/session";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@/shared/lib/hooks/auth";

export type FormInput = {
  login: string;
  password: string;
}

export function LoginForm({
  className
} : {
  className?: string;
}) {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { saveSession } = useSessionRepository();
  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      login: "",
      password: ""
    },
  })
  

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    /// fetch auth
    const session: Session = {
      access_token: 'string',
      refresh_token: 'string',
      access_expires_in: 'string',
      refresh_expires_in: 'string'
    }
    
    saveSession(session);
    setIsAuthenticated(true);
    
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
        name="login"
        color="opaqueBlack"
        rules={{ required: true }}
        label="Login" 
        placeholder="Your login"/>
      <UiInput 
        control={control} 
        name="password"
        type="password"
        color="opaqueBlack"
        rules={{ required: true }}
        label="Password" 
        placeholder="Your password"/>
      <UiButton className={styles['button']} color="blue" type="submit">
        Login
      </UiButton>
    </form>
  )
}