import { UiField } from "@/shared/ui/field";
import { UiInput } from "@/shared/ui/input";
import { MinuxLogo } from "@/shared/ui/logo";
import { UiPasswordInput } from "@/shared/ui/password-input";
import { Button, Fieldset, FieldsetContentProps } from "@chakra-ui/react";

export function LoginForm({ ...props }: FieldsetContentProps) {


  return (
    <Fieldset.Root size={'lg'}>
      <Fieldset.Legend textAlign={'center'}> <MinuxLogo /> </Fieldset.Legend>
      <Fieldset.Content {...props}>
        <UiField label={"Login"}>
          <UiInput name={"login"} />
        </UiField>
        <UiField label={"Password"}>
          <UiPasswordInput bg={'bg.panel'} borderColor={'minux.solid'}/>
        </UiField>
      </Fieldset.Content>
      <Button >
        Login
      </Button>
    </Fieldset.Root>
  )
}