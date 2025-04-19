import { LoginSchema, LoginType, sessionRepository } from "@/entities/session";
import { UiField } from "@/shared/ui/field";
import { UiInput } from "@/shared/ui/input";
import { MinuxLogo } from "@/shared/ui/logo";
import { UiPasswordInput } from "@/shared/ui/password-input";
import { Fieldset, FieldsetContentProps, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { isSuccessResponse } from "@/shared/api";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { UiButton } from "@/shared/ui/button";
import isEmpty from "lodash/isEmpty";

const { useSessionMutation } = sessionRepository;

export function RegistrationForm({ ...props }: FieldsetContentProps) {
  const navigate = useNavigate();
  const search: { redirect: string; } = useSearch({ from: '/_auth' });
  const { setSessionViaRegistration } = useSessionMutation();
  const { formState: { errors }, handleSubmit, control, getValues } = useForm<LoginType>({
    defaultValues: {
      login: '',
      password: ''
    },
    mode: 'onChange',
    resolver: zodResolver(LoginSchema)
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmitLogin = async (data: LoginType) => {
    const response = await setSessionViaRegistration(data);

    if (isSuccessResponse(response)) navigate({ to: search.redirect || '/' });
  }

  const isInvalidPasswordConfirm = !isEmpty(passwordConfirm) && getValues('password') !== passwordConfirm;

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)}>
      <Fieldset.Root size={'lg'}>
        <Fieldset.Legend textAlign={'center'}> 
          <MinuxLogo fontSize={'4xl'}/> 
        </Fieldset.Legend>
        <Fieldset.Content {...props} >
          <UiField label={"Login"} errorText={errors.login?.message} invalid={!!errors.login}>
            <Controller
              control={control}
              name={"login"}
              rules={{ required: true }}
              render={({ field }) => <UiInput {...field} />}
            />
          </UiField>
          <UiField label={"Password"} errorText={errors.password?.message} invalid={!!errors.password}>
            <Controller
              control={control}
              rules={{ required: true }}
              name={"password"}
              render={({ field }) => <UiPasswordInput {...field} />}
            />
          </UiField>
          <UiField label={"Confirm password"} errorText={"Passwords do not match"} invalid={isInvalidPasswordConfirm}>
            <UiPasswordInput onChange={(e) => setPasswordConfirm(e.target.value)} />
          </UiField>
        </Fieldset.Content>
        <VStack>
          <UiButton 
            w={'4xs'} 
            type="submit" 
            colorPalette={"accept"}
            disabled={
              Object.keys(errors).length > 0 || 
              isInvalidPasswordConfirm 
              || passwordConfirm === '' 
              || getValues('login') === ''
              || getValues('password') === ''
            }
          >
            Register
          </UiButton>
          <ChakraLink asChild justifyContent={'center'} variant={'underline'}>
            <Link to={"/login"} search={{ redirect: search.redirect || '/' }}>
              Have an account? Login!
            </Link>
          </ChakraLink>
        </VStack>
      </Fieldset.Root>
    </form>
  )
}