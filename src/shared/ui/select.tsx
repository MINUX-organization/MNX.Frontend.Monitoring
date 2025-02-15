/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import type { CollectionItem } from "@chakra-ui/react"
import { Box, Center, Select as ChakraSelect, Portal } from "@chakra-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { UiInput } from './input'
import { UiContainerRounded } from './container-rounded'
import { UiText } from './text'
import _ from 'lodash'
import { match } from 'ts-pattern'

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

export interface SelectItemProps<T> {
  items : T[]
  getLabel: (item: T) => string;
  onChange: (item: NoInfer<T> | null) => void;
  selectedItem?: T | null
  firstInitValue?: boolean
}

export function UiSelect<T>({ items, getLabel, onChange, selectedItem, firstInitValue }: SelectItemProps<T>) {
  const [query, setQuery] = useState('')
  const [firstInit, setFirstInit] = useState(firstInitValue ?? false)
  const [item, setItem] = useState<T | null>(null)
  const [inputWidth, setInputWidth] = useState<number | string>('auto');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (item: T | null) => {
    onChange(item)
    setItem(item)
  }

  useEffect(() => {
    if (_.isEmpty(selectedItem)) {
      setItem(null)
      return;
    }

    if (firstInit && selectedItem) {
      setItem(selectedItem as T)
      setFirstInit(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  useEffect(() => {
    const updateWidth = () => {
      if (inputRef.current) {
        setInputWidth(inputRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const filteredObjects =
    query === ''
      ? items
      : items?.filter((item) => 
          getLabel(item).toLowerCase().includes(query.toLowerCase())
        )

  return (
    <Combobox immediate value={item} onChange={handleChange} onClose={() => setQuery('')}>
      <UiInput asChild>
        <ComboboxInput
          ref={inputRef}
          aria-label="Assignee"
          displayValue={(item) => {
            if (!item) return '';

            if (typeof(item) === 'string') {
              return item.toString();
            }

            return getLabel(item as T);
          }}
          onChange={(event) => setQuery(event.target.value)}
        />
      </UiInput>
      <UiContainerRounded zIndex={'max'} asChild bg={'bg.input'} mt={2} p={0} h={'15rem'}>
        <ComboboxOptions
          anchor="bottom" 
          style={{ 
            width: inputWidth,
            emptyCells: 'hide',
            boxSizing: 'border-box'
          }}
        >
          {match(filteredObjects)
          .when((filteredObjects) => _.isEmpty(filteredObjects), () => (
            <Center asChild bg={'bg.input'} mt={2} p={0} h={'15rem'}>
              <UiText color={'fg.input'}>No results</UiText>
            </Center>
          ))
          .otherwise(() => (
            filteredObjects.map((item) => (
              <Box 
                asChild  
                key={getLabel(item)}
                _hover={{ bg: 'bg.hover' }} 
                p={3} pl={4} pr={4} 
                _selected={{ color: 'minux.solid' }}
                transition={"all 0.2s ease-in-out"}
              >
                <ComboboxOption value={item}>
                  <UiText >{getLabel(item)}</UiText>
                </ComboboxOption>
              </Box>
            ))
          ))}
        </ComboboxOptions>
      </UiContainerRounded>
    </Combobox>
  );
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemText = ChakraSelect.ItemText