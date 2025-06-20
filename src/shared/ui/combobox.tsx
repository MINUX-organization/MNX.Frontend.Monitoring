"use client"

import {
  Center,
  Combobox,
  HStack,
  InputGroup,
  InputProps,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { UiContainerRounded } from "./container-rounded";
import { UiText } from "./text";
import { useEffect, useRef, useState } from "react";
import { UiInput } from "./input";
import { useDebounced } from "../lib/utils/debounce";

export interface ComboboxItemProps<T> extends Omit<InputProps, 'onChange'> {
  items : T[]
  getLabel: (item: T) => string;
  onChange: (item: NoInfer<T> | null) => void;
  selectedItem?: T | null
  renderEndElement?: (item: T) => React.ReactNode;
  invalid?: boolean
}

export function UiCombobox<T>({ 
    items, 
    getLabel, 
    onChange, 
    selectedItem, 
    placeholder,
    renderEndElement,
    invalid,
    ...props
  }: ComboboxItemProps<T>) {
  const [item, setItem] = useState<T | null>(null)
  const { contains } = useFilter({ sensitivity: "base" })
  const [inputWidth, setInputWidth] = useState<number | string>('auto');
  const inputRef = useRef<HTMLInputElement>(null);

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
    itemToString: (item) => getLabel(item),
    itemToValue: (item) => getLabel(item),
  })

  const [inputValue, setInputValueDebounced] = useDebounced<string>((val) => {filter(val)}, "", 500);

  const updateWidth = () => {
    if (inputRef.current && inputRef.current.offsetWidth !== inputWidth) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  };

  const handleSelect = (newItem: T) => {
    setInputValueDebounced(getLabel(newItem));
    setItem(newItem);
    onChange(newItem);
  };

  useEffect(() => {
      if (!selectedItem) {
        setInputValueDebounced('');
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
    <Combobox.Root
      collection={collection}
      openOnClick = {true}
      positioning={{ placement: 'bottom-end' }}
    >
      <Combobox.Control>
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
              <Combobox.Input 
              value={inputValue}
              onChange={(event) => setInputValueDebounced(event.target.value ?? '')}
              ref={inputRef}
              aria-label="Assignee"
               />
            </UiInput>
        </InputGroup>
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger onClick={() => {
            setInputValueDebounced('');
            setItem(null);
            onChange(null);
          }} />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>

          <UiContainerRounded
                  asChild 
                  zIndex={'max'} 
                  bg={'bg.input'} 
                  p={0} 
                  maxH='12rem'
                  mt={0}
                >
                  <Combobox.Content
                    style={{ 
                      width: inputWidth,
                      emptyCells: 'hide',
                      boxSizing: 'border-box',
                      
                    }}
                  >

              <Combobox.Empty>
                <Center asChild bg={'bg.input'} p={0} maxH='12rem'>
                  <UiText color={'fg.input'}>No results</UiText>
                </Center>
              </Combobox.Empty>

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
                  <Combobox.Item item={item} key={getLabel(item)} onClick={() => handleSelect(item)}>
                    <UiText >{getLabel(item)}</UiText>
                    {renderEndElement?.(item as T)}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                </HStack>
              ))}

            </Combobox.Content>
          </UiContainerRounded>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

