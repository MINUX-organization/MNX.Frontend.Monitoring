import { ButtonProps } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { UiButton } from "./button"
import { UiText } from "./text"

export interface UiTogglerProps extends Omit<ButtonProps, 'onChange'> {
  values: string[]
  value: string
  onChange: (value: string) => void
  reverse?: boolean
  renderLabel?: (value: string) => React.ReactNode
}

export function UiToggler({ 
  values, 
  value,
  onChange, 
  reverse = false,
  renderLabel, 
  ...props 
}: UiTogglerProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [direction, setDirection] = useState<1 | -1>(1);
  const currentIndex = values.indexOf(currentValue);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleClick = () => {
    if (values.length <= 1) return;

    let newIndex = currentIndex;
    let newDirection = direction;

    if (reverse) {
      // Логика для паттерна 1-2-3-2-1
      if (currentIndex === values.length - 1) {
        newDirection = -1;
      } else if (currentIndex === 0) {
        newDirection = 1;
      }
      newIndex = currentIndex + newDirection;
    } else {
      // Обычный циклический режим
      newIndex = (currentIndex + 1) % values.length;
    }

    const newValue = values[newIndex];
    
    setCurrentValue(newValue);
    onChange(newValue);
    setDirection(newDirection);
  };

  return (
    <UiButton 
      colorPalette={'accept'}
      disabled={values.length === 1}
      onClick={handleClick} 
      userSelect={'none'}
      {...props}
    >
      {!renderLabel && <UiText textTransform={'capitalize'}>{currentValue}</UiText>}
      {renderLabel && renderLabel(currentValue)}
    </UiButton>
  );
}