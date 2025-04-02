import { ActiveIndicator, UiEditableInput } from "@/shared/ui";
import { Group, Stack, StackProps, Wrap } from "@chakra-ui/react";
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
    <Stack 
      direction={{ base: 'column', md: 'row'}} 
      alignItems={{ base: 'flex-start', md: 'center'}} 
      justifyContent={'space-between'} 
      {...props}
    >
      <Group>
        <ActiveIndicator isOnline activeState={'Active'} />
        <UiEditableInput 
          disabled 
          maxW={'20rem'}
          textStyle={'lg'}
          value={rig.name} 
          onSave={() => console.log('111')}
        />
      </Group>
      {actions &&
        <Wrap gap={2}>
          {actions.map((action) => (
            <React.Fragment key={action.toString()}>{action(rig)}</React.Fragment>
          ))}
        </Wrap>
      }
    </Stack>
  )
}