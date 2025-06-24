"use client"
import type { InputProps } from "@chakra-ui/react"
import { HStack, InputGroup, Portal, Select as ChakraSelect, useListCollection } from "@chakra-ui/react"
import { UiContainerRounded } from "./container-rounded";
import { useEffect, useRef, useState } from "react";
import { UiInput } from "./input";
import { UiText } from "./text";

export interface SelectItemProps<T> extends Omit<InputProps, 'onChange'> {
  items : T[]
  getLabel: (item: T) => string;
  onChange: (item: NoInfer<T> | null) => void;
  selectedItem?: T | null
  renderEndElement?: (item: T) => React.ReactNode;
  invalid?: boolean
}

export function UiSelect<T>({ 
  items, 
  getLabel, 
  onChange, 
  selectedItem, 
  placeholder,
  renderEndElement,
  invalid,
  ...props
}: SelectItemProps<T>) {
    const [inputWidth, setInputWidth] = useState<number | string>('auto');
    const [item, setItem] = useState<T | null>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const { collection} = useListCollection({
    initialItems: items,
    itemToString: (item) => getLabel(item),
    itemToValue: (item) => getLabel(item),
  })

    const updateWidth = () => {
    if (inputRef.current && inputRef.current.offsetWidth !== inputWidth) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  };

  const handleSelect = (newItem: T) => {
    setItem(newItem);
    onChange(newItem);
  };

  useEffect(() => {
      if (!selectedItem) {
        setItem(null);
      } else {
        setItem(selectedItem ?? null);
      }
    }, [selectedItem]);

  useEffect(() => {    
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
      }, []);

  return (
    <ChakraSelect.Root
     collection={collection} 
     defaultValue={selectedItem ? [getLabel(selectedItem)] : undefined}
     >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <InputGroup w={'100%'} endElement={renderEndElement?.(item as T)}>
                <UiInput 
                  asChild
                  aria-invalid={invalid ? 'true' : 'false'}
                  placeholder={placeholder}
                  onMouseEnter={() => updateWidth()} 
                  onTouchStart={() => updateWidth()}
                  onFocus={() => updateWidth()}
                  {...props}
                >
        <ChakraSelect.Trigger >
          <ChakraSelect.ValueText placeholder={placeholder || "Select..."}>
                {item ? getLabel(item) : placeholder || "Select..."}
              </ChakraSelect.ValueText>
        </ChakraSelect.Trigger>
        </UiInput>
        </InputGroup>
        

        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
        
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
            <UiContainerRounded
                asChild 
                zIndex={'max'} 
                bg={'bg.input'} 
                p={0} 
                maxH='12rem'
                mt={0}
            >
            <ChakraSelect.Content
                style={{ 
                        width: inputWidth,
                        emptyCells: 'hide',
                        boxSizing: 'border-box',
                        
                        }}>
                {collection.items.map((item) => (
                <HStack 
                    asChild  
                    key={getLabel(item)}
                    _hover={{ bg: 'bg.hover' }} 
                    p={3} pl={4} pr={4} 
                    _selected={{ color: 'minux.solid' }}
                    _active={{ bg: 'bg.active' }}
                    transition={"all 0.2s ease-in-out"}
                    justify={'space-between'}
                    cursor={'pointer'}
                    userSelect={'none'}
                >
                    <ChakraSelect.Item item={item} key={getLabel(item)} onClick={() => handleSelect(item)}>
                    <UiText >{getLabel(item)}</UiText>
                    {renderEndElement?.(item as T)}
                    <ChakraSelect.ItemIndicator />
                    </ChakraSelect.Item>
                </HStack>
                ))}
            </ChakraSelect.Content>
          </UiContainerRounded>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  )
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemText = ChakraSelect.ItemText

