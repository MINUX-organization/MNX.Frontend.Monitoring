import { Input, InputProps } from "@chakra-ui/react";
import { match } from "ts-pattern";
import { UiText } from "./text";
import { forwardRef } from "react";

// Расширяем стандартные пропсы
type UiInputProps<T = unknown> = Omit<InputProps, "value"> & {
  value?: T;
  onChange?: (value: T) => void;
};

export const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
  ({ value, onChange, ...props }, ref) => {
    
    const stringValue = typeof value === "object" 
      ? JSON.stringify(value) 
      : value?.toString() || "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof value === "object") {
        try {
          const objValue = JSON.parse(e.target.value);
          onChange?.(objValue);
        } catch {
          onChange?.(e.target.value);
        }
      } else {
        onChange?.(e.target.value as unknown);
      }
    };

    return (
      <>
        {match(props.readOnly)
          .with(true, () => <UiText {...props}>{stringValue}</UiText>)
          .otherwise(() => (
            <Input
              {...props}
              value={stringValue}
              onChange={handleChange}
              textStyle="md"
              ref={ref}
              colorPalette="input"
              bg="bg.input"
              borderColor="minux.solid"
              rounded="md"
            />
          ))}
      </>
    );
  }
);