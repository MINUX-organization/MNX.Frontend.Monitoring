import { UiContainerRounded } from "@/shared/ui"
import { PresetGroupedByGpuType, PresetType } from ".."
import { Collapsible, Heading, HStack, IconButton, Separator, Stack } from "@chakra-ui/react"
import { ChevronDownIcon } from "@/shared/assets/svg/chevron-down"
import { motion } from "motion/react"
import { PresetItem } from "./preset-item"
import map from "lodash/map"

const MChevron = motion.create(ChevronDownIcon);

interface PresetGroupedByGpuItemProps {
  presetGroupedByGpu: PresetGroupedByGpuType
  actions?: ((item: PresetType) => React.ReactNode)[]
}

export function PresetGroupedByGpuItem({ presetGroupedByGpu, actions }: PresetGroupedByGpuItemProps) {
  return (  
    <Collapsible.Root>
      <Collapsible.Context>
        {({ open }) => (
          <>
            <UiContainerRounded>
              <HStack justify={'space-between'}>
                <Heading>{presetGroupedByGpu.name}</Heading>
                <Collapsible.Trigger asChild>
                  <IconButton aria-label="Toggle" variant="ghost">
                    <MChevron 
                      w={8} h={8} 
                      initial={{ rotate: 0 }} 
                      animate={{ rotate: open ? 180 : 0 }}
                    />
                  </IconButton>
                </Collapsible.Trigger>
              </HStack>
              <Collapsible.Content>
                <Stack separator={<Separator />} mt={4}>
                  {map(presetGroupedByGpu.presets, preset => (
                    <PresetItem key={preset.id} type="list" preset={preset} actions={actions}/>
                  ))}
                </Stack>
              </Collapsible.Content>
            </UiContainerRounded>
          </>
        )}
      </Collapsible.Context>
    </Collapsible.Root>
  )
}