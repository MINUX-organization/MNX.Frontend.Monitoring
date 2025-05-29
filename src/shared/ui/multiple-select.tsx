import { Portal, Select } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

export function UiMultipleSelect({ 
  ...props
}: Select.RootProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [controlWidth, setControlWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setControlWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <Select.Root multiple colorPalette={'input'} {...props}>
      <Select.HiddenSelect />
      <Select.Control ref={ref} bgColor={'bg.input'}>
        <Select.Trigger border={'1px solid'} borderColor={'minux.solid'} fontSize={'md'}>
          <Select.ValueText/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner 
          style={{ zIndex: '999999' }} 
          w={controlWidth ? `${controlWidth}px` : 'auto'}
        >
          <Select.Content bgColor={'bg.input'} border={'1px solid'} borderColor={'minux.solid'} p={0}>
            {props.collection.items.map((item) => (
              <Select.Item 
                key={item.value} 
                item={item} 
                _hover={{ bgColor: 'bg.hover' }} 
                pl={3} pr={3} pt={3.5} pb={3.5}
              >
                {item.render}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}