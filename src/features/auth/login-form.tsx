import { LoginSchema, LoginType, sessionRepository } from "@/entities/session";
import { UiField } from "@/shared/ui/field";
import { UiInput } from "@/shared/ui/input";
import { MinuxLogo } from "@/shared/ui/logo";
import { UiPasswordInput } from "@/shared/ui/password-input";
import { Fieldset, FieldsetContentProps, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { isSuccessResponse } from "@/shared/api";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { UiButton } from "@/shared/ui/button";

const { useSessionMutation } = sessionRepository;

export function LoginForm({ ...props }: FieldsetContentProps) {
  const navigate = useNavigate();
  const search: { redirect: string; } = useSearch({ from: '/_auth' });
  const { setSessionViaLogin } = useSessionMutation();
  const { formState: { errors }, handleSubmit, control } = useForm<LoginType>({
    defaultValues: {
      login: '',
      password: ''
    },
    mode: 'onChange',
    resolver: zodResolver(LoginSchema)
  });

  const handleSubmitRegistration = async (data: LoginType) => {
    const response = await setSessionViaLogin(data);

    if (isSuccessResponse(response)) navigate({ to: search.redirect || '/' });
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitRegistration)}>
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
        </Fieldset.Content>

          <VStack>
            <UiButton
              w={'4xs'} 
              type="submit" 
              colorPalette={"accept"}
              disabled={Object.keys(errors).length > 0}
            >
              Login
            </UiButton>
            <ChakraLink asChild justifyContent={'center'} variant={'underline'}>
              <Link to={"/registration"} search={{ redirect: search.redirect || '/' }}>
                Don’t have an account? Register now!
              </Link>
            </ChakraLink>
          </VStack>

      </Fieldset.Root>
    </form>
  )
}