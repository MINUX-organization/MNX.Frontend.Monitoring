import { Slider as ChakraSlider, For, HStack } from "@chakra-ui/react"
import * as React from "react"
import { UiText } from "./text";
import { UiInput } from "./input";

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
  label?: React.ReactNode
  showValue?: boolean
  showMarks?: boolean
}

const alignValues = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const UiSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const [inputValue, setInputValue] = React.useState(() => {
      if (props.value) return props.value[0]
      if (props.defaultValue) return props.defaultValue[0]
      return 0
    })
    const { marks: marksProp, label, showValue, showMarks, ...rest } = props
    const value = props.defaultValue ?? props.value

    const marks = marksProp?.map((mark) => {
      if (typeof mark === "number") return { value: mark, label: undefined }
      return mark
    }) || (showMarks && [
      { value: props.min ?? 0, label: `${props.min}` },
      { value: props.max ?? 100, label: `${props.max}` },
    ]) || undefined

    const hasMarkLabel = !!marks?.some((mark) => mark.label)

    const handleAction = () => {
      const alignedValue = alignValues(inputValue, props.min ?? 0, props.max ?? 100)
    
      setInputValue(alignedValue)

      props.onValueChange?.({ value: [alignedValue] })
      props.onValueChangeEnd?.({ value: [alignedValue] });
    };

    return (
      <ChakraSlider.Root 
        ref={ref}
        thumbAlignment="center"
        {...rest}
        onValueChange={({ value }) => {
          setInputValue(value[0])
          rest.onValueChange?.({ value })
        }}
      >
          {label && !showValue && (
            <ChakraSlider.Label>{label}</ChakraSlider.Label>
          )}
          {label && showValue && (
            <HStack justify="space-between">
              <ChakraSlider.Label>
                <UiText>{label}</UiText>
              </ChakraSlider.Label>
              <UiInput 
                value={inputValue}
                onChange={(e) => {
                  const number = Number(e.target.value);

                  if (Number.isNaN(number)) return;

                  setInputValue(number);
                  props.onValueChange?.({ value: [number] });
                }}
                onBlur={() => handleAction()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAction();
                    e.currentTarget.blur();
                  }
                }}
                bg={"transparent"} 
                w={"65px"} h={'24px'} 
                textAlign={"right"} />
            </HStack>
          )}
        <ChakraSlider.Control data-has-mark-label={hasMarkLabel || undefined}>
          <ChakraSlider.Track>
            <ChakraSlider.Range bg={"minux.solid"} />
          </ChakraSlider.Track>
          <SliderThumbs value={value} />
          <SliderMarks marks={marks} />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    )
  },
)

function SliderThumbs(props: { value?: number[] }) {
  const { value } = props
  return (
    <For each={value}>
      {(_, index) => (
        <ChakraSlider.Thumb 
          key={index} 
          index={index} 
          borderColor={"minux.solid"}
          _active={{ boxShadow: "0 0 0 3px rgba(60, 158, 165, 1)" }}
          transition={"background 0.2s ease-in-out, box-shadow 0.2s ease-in-out"}
        >
          <ChakraSlider.HiddenInput />
        </ChakraSlider.Thumb>
      )}
    </For>
  )
}

interface SliderMarksProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
}

const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>(
  function SliderMarks(props, ref) {
    const { marks } = props
    if (!marks?.length) return null

    return (
      <ChakraSlider.MarkerGroup ref={ref} >
        {marks.map((mark, index) => {
          const value = typeof mark === "number" ? mark : mark.value
          const label = typeof mark === "number" ? undefined : mark.label
          return (
            <ChakraSlider.Marker key={index} value={value}>
              <ChakraSlider.MarkerIndicator />
              {label}
            </ChakraSlider.Marker>
          )
        })}
      </ChakraSlider.MarkerGroup>
    )
  },
)
