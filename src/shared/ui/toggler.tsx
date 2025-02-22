import { ButtonProps } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { UiText } from "./text";
import { UiButton } from "./button";

export interface UiTogglerProps extends Omit<ButtonProps, 'onChange'> {
  values: string[]
  onChange: (value: string) => void
  reverse?: boolean;
  renderLabel?: (value: string) => React.ReactNode
}

export function UiToggler({ values, onChange, reverse, renderLabel, ...props }: UiTogglerProps) {
  const [offset, setOffset] = useState(0);
  const [reversing, setReversing] = useState(false);

  useEffect(() => {
    setOffset(0)
  }, [values])

  useEffect(() => {
    onChange(values[offset])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  const handleClick = () => {
    if (values.length === 1) return

    if (reversing && offset === 0) {
      setReversing(false);
      setOffset(prev => (prev + 1) % values.length)
      return;
    }

    if (reverse && offset === values.length - 1) {
      setReversing(true)
      setOffset(prev => prev - 1)
      return
    }

    if (reversing) {
      setOffset(prev => prev - 1)
      return
    }
    
    setOffset(prev => (prev + 1) % values.length)
  }

  return (
    <UiButton 
      colorPalette={'accept'}
      disabled={values.length === 1}
      onClick={handleClick} 
      userSelect={'none'}
      {...props}
    >
      {!renderLabel && <UiText textTransform={'capitalize'}>{values[offset]}</UiText>}
      {renderLabel && renderLabel(values[offset])}
    </UiButton>
  )
}