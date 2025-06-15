"use client" 

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import type { CollectionItem, InputProps } from "@chakra-ui/react"
import { Center, Select as ChakraSelect, HStack, Portal } from "@chakra-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { UiInput } from './input'
import { UiContainerRounded } from './container-rounded'
import { UiText } from './text'
import isEmpty from 'lodash/isEmpty'
import { match } from 'ts-pattern'
import { InputGroup } from './input-group'
import { useDebounced } from '../lib/utils/debounce'

interface SelectTriggerProps extends ChakraSelect.ControlProps {
  clearable?: boolean
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(function SelectTrigger(props, ref) {
  const { children, clearable, ...rest } = props
  return (
    <ChakraSelect.Control {...rest}>
      <ChakraSelect.Trigger ref={ref}>{children}</ChakraSelect.Trigger>
      <ChakraSelect.IndicatorGroup>
        {clearable && <SelectClearTrigger />}
        <ChakraSelect.Indicator />
      </ChakraSelect.IndicatorGroup>
    </ChakraSelect.Control>
  )
})

const SelectClearTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraSelect.ClearTriggerProps
>(function SelectClearTrigger(props, ref) {
  return (
    <ChakraSelect.ClearTrigger asChild {...props} ref={ref}>
      <CloseButton
        size="xs"
        variant="plain"
        focusVisibleRing="inside"
        focusRingWidth="2px"
        pointerEvents="auto"
      />
    </ChakraSelect.ClearTrigger>
  )
})

interface SelectContentProps extends ChakraSelect.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectContentProps
>(function SelectContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content {...rest} ref={ref} />
      </ChakraSelect.Positioner>
    </Portal>
  )
})

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  ChakraSelect.ItemProps
>(function SelectItem(props, ref) {
  const { item, children, ...rest } = props
  return (
    <ChakraSelect.Item key={item.value} item={item} {...rest} ref={ref}>
      {children}
      <ChakraSelect.ItemIndicator />
    </ChakraSelect.Item>
  )
})

interface SelectValueTextProps
  extends Omit<ChakraSelect.ValueTextProps, "children"> {
  children?(items: CollectionItem[]): React.ReactNode
}

export const SelectValueText = React.forwardRef<
  HTMLSpanElement,
  SelectValueTextProps
>(function SelectValueText(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraSelect.ValueText {...rest} ref={ref}>
      <ChakraSelect.Context>
        {(select) => {
          const items = select.selectedItems
          if (items.length === 0) return props.placeholder
          if (children) return children(items)
          if (items.length === 1)
            return select.collection.stringifyItem(items[0])
          return `${items.length} selected`
        }}
      </ChakraSelect.Context>
    </ChakraSelect.ValueText>
  )
})

export const SelectRoot = React.forwardRef<
  HTMLDivElement,
  ChakraSelect.RootProps
>(function SelectRoot(props, ref) {
  return (
    <ChakraSelect.Root
      {...props}
      ref={ref}
      positioning={{ sameWidth: true, ...props.positioning }}
    >
      {props.asChild ? (
        props.children
      ) : (
        <>
          <ChakraSelect.HiddenSelect />
          {props.children}
        </>
      )}
    </ChakraSelect.Root>
  )
}) as ChakraSelect.RootComponent

interface SelectItemGroupProps extends ChakraSelect.ItemGroupProps {
  label: React.ReactNode
}

export const SelectItemGroup = React.forwardRef<
  HTMLDivElement,
  SelectItemGroupProps
>(function SelectItemGroup(props, ref) {
  const { children, label, ...rest } = props
  return (
    <ChakraSelect.ItemGroup {...rest} ref={ref}>
      <ChakraSelect.ItemGroupLabel>{label}</ChakraSelect.ItemGroupLabel>
      {children}
    </ChakraSelect.ItemGroup>
  )
})

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
  const [query, setQuery] = useState('')
  const [_, setDebounceChange] = useDebounced((val) => setQuery(val),'', 500)
  const [item, setItem] = useState<T | null>(null)
  const [inputWidth, setInputWidth] = useState<number | string>('auto');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (newItem: T | null) => {
    setItem(newItem);
    onChange(newItem);
    setQuery('');
  };

  useEffect(() => {
    if (!selectedItem) {
      setItem(null);
      setQuery('');
    } else {
      setItem(selectedItem ?? null);
    }
  }, [selectedItem]);

  const updateWidth = () => {
    if (inputRef.current && inputRef.current.offsetWidth !== inputWidth) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  };

  useEffect(() => {    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredObjects =
    query === ''
      ? items
      : items?.filter((item) => 
          getLabel(item).toLowerCase().includes(query.toLowerCase())
        )

  return (
    <Combobox immediate value={item} onChange={handleChange} onClose={() => setDebounceChange('')}>
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
          <ComboboxInput
            ref={inputRef}
            aria-label="Assignee"
            displayValue={(item) => {
              if (!item) return '';

              return selectedItem ? getLabel(selectedItem) : getLabel(item as T);
            }}
            onChange={(event) => setDebounceChange(event.target.value ?? '')}
          />
        </UiInput>
      </InputGroup>
      <UiContainerRounded
        asChild 
        zIndex={'max'} 
        bg={'bg.input'} 
        p={0} h={'15rem'}
        mt={2}
      >
        <ComboboxOptions
          anchor="bottom"
          style={{ 
            width: inputWidth,
            emptyCells: 'hide',
            boxSizing: 'border-box',
          }}
        >
          {match(filteredObjects)
          .when((filteredObjects) => isEmpty(filteredObjects), () => (
            <Center asChild bg={'bg.input'} p={0} h={'14rem'}>
              <UiText color={'fg.input'}>No results</UiText>
            </Center>
          ))
          .otherwise(() => (
            filteredObjects.map((item) => (
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
                <ComboboxOption value={item}>
                  <UiText >{getLabel(item)}</UiText>
                  {renderEndElement?.(item as T)}
                </ComboboxOption>
              </HStack>
            ))
          ))}
        </ComboboxOptions>
      </UiContainerRounded>
    </Combobox>
  );
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemText = ChakraSelect.ItemText