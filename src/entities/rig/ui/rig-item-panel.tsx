import { ActiveIndicator, UiEditableInput } from "@/shared/ui";
import { Flex, Stack, StackProps } from "@chakra-ui/react";
import { RigType } from "../model/rig.type";
import React from "react";

interface RigItemPanelProps extends StackProps {
  rig: RigType
  actions?: ((item: RigType) => React.ReactNode)[]
}

export function RigItemPanel({
  rig,
  actions,
  ...props
}: RigItemPanelProps) {
  return (
    <Stack direction={{ base: 'column', md: 'row'}} alignItems={'center'} {...props}>
      <ActiveIndicator active />
      <UiEditableInput value={rig.name} onSave={() => console.log('111')}/>
      {actions &&
        <Flex gap={2}>
          {actions.map((action) => (
            <React.Fragment key={action.toString()}>{action(rig)}</React.Fragment>
          ))}
        </Flex>
      }
    </Stack>
  )
}