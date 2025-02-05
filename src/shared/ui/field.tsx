import { Field as ChakraField } from "@chakra-ui/react"
import * as React from "react"
import { match } from "ts-pattern";
import { ConfirmedIcon } from "../assets/svg/confirmed";
import { UnconfirmedIcon } from "../assets/svg/unconfirmed";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
  labelprops?: ChakraField.LabelProps,
  confirmed?: boolean;
}

export const UiField = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, confirmed, ...rest } =
      props
    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label {...props.labelprops} textStyle={'md'}>
            {label}
            {
              match(confirmed)
                .with(true, () => <ConfirmedIcon fill={'bg.success'}/>)
                .with(false, () => <UnconfirmedIcon fill={'border.error'} />)
                .otherwise(() => null)
            }
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    )
  },
)
