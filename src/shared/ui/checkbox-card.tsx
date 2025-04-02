import { CheckboxCard as ChakraCheckboxCard, VStack } from "@chakra-ui/react"
import * as React from "react"
import { WarnIcon } from "../assets/svg"

export interface CheckboxCardProps extends ChakraCheckboxCard.RootProps {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
  indicator?: React.ReactNode | null
  indicatorPlacement?: "start" | "end" | "inside"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  warn?: string
  image?: React.ReactNode
}

export const UiCheckboxCard = React.forwardRef<
  HTMLInputElement,
  CheckboxCardProps
>(function CheckboxCard(props, ref) {
  const {
    inputProps,
    label,
    description,
    icon,
    addon,
    indicator = <ChakraCheckboxCard.Indicator borderColor={'minux.solid'} _checked={{ borderColor: 'transparent' }}/>,
    indicatorPlacement = "end",
    image,
    warn,
    ...rest
  } = props

  const hasContent = label || description || icon
  const ContentWrapper = indicator ? ChakraCheckboxCard.Content : React.Fragment

  return (
    <ChakraCheckboxCard.Root  
      cursor={"pointer"}    
      borderColor={'minux.solid'}
      _checked={{ borderColor: 'transparent', borderImage: 'none' }}
      colorPalette={warn ? 'orange' : 'green'}
      bg={'bg.transparent'}
      {...rest}
    >
      <ChakraCheckboxCard.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckboxCard.Control >
        {indicatorPlacement === "start" && indicator}
        {hasContent && (
          <ContentWrapper h={'full'}>
            {icon}
            {label && (
              <ChakraCheckboxCard.Label h={'full'} alignItems={'flex-start'}>
                {label}
              </ChakraCheckboxCard.Label>
            )}
            {description && (
              <ChakraCheckboxCard.Description>
                {description}
              </ChakraCheckboxCard.Description>
            )}
            {indicatorPlacement === "inside" && indicator}
          </ContentWrapper>
        )}
        <VStack justify={'space-between'} h={'full'} w={'20px'}>
          {indicatorPlacement === "end" && indicator}
          {warn && <WarnIcon width={'20px'} height={'20px'} fill={'orange.500'}/>}
          {image}
        </VStack>
      </ChakraCheckboxCard.Control>
      {addon && <ChakraCheckboxCard.Addon>{addon}</ChakraCheckboxCard.Addon>}
    </ChakraCheckboxCard.Root>
  )
})

export const CheckboxCardIndicator = ChakraCheckboxCard.Indicator
