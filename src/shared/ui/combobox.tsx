/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const inputRef = useRef<HTMLInputElement>(null);

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
    itemToString: (item) => getLabel(item),
    itemToValue: (item) => getLabel(item),
  })

  const [_, setInputValueDebounced] = useDebounced<string>((val) => {filter(val)}, "", 500);

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

  return (
    <Combobox.Root
      collection={collection}
      openOnClick = {true}
      defaultValue={selectedItem ? [getLabel(selectedItem)] : []}
      positioning={{ placement: 'bottom-end' }}
    >
      <Combobox.Control>
        <InputGroup w={'100%'} endElement={renderEndElement?.(item as T)}>
          <UiInput 
            asChild
            aria-invalid={invalid ? 'true' : 'false'}
            placeholder={placeholder}
            {...props}
          >
            <Combobox.Input 
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

export const ComboboxLabel = Combobox.Label
export const ComboboxmText = Combobox.ItemText
