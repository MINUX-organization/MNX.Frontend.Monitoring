import { Input, InputProps } from "@chakra-ui/react";
import { match } from "ts-pattern";
import { UiText } from "./text";
import { forwardRef } from "react";

export const UiInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      {match(props.readOnly)
        .with(true, () => <UiText {...props}>{props.value}</UiText>)
        .otherwise(() => (
          <Input
            ref={ref}
            colorPalette="input"
            bg="bg.input"
            borderColor="minux.solid"
            rounded="md"
            textStyle={'md'}
            _focusVisible={{ borderColor: "orange", focusRingColor: "orange" }}
            _invalid={{ borderColor: "red.500", focusRingColor: "red.500" }}
            _peerInvalid={{ borderColor: "red.500", focusRingColor: "red.500" }}
            _groupInvalid={{ borderColor: "red.500", focusRingColor: "red.500" }} 
            {...props}
          />
        ))}
    </>
  );
});