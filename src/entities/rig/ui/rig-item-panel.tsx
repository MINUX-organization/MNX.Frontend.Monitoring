import { ActiveIndicator, UiEditableInput } from "@/shared/ui";
import { Group, Stack, StackProps } from "@chakra-ui/react";
import { RigType } from "../model/rig.type";

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
        <Group>
          {actions.map((action) => action(rig))}
        </Group>
      }
    </Stack>
  )
}