import { UiContainerRounded } from "@/shared/ui";
import { Stack } from "@chakra-ui/react";
import { RigItemPanel } from "./rig-item-panel";
import { RigType } from "../model/rig.type";

export function RigItem({
  rig,
  actions,
} : {
  rig: RigType
  actions?: ((item: RigType) => React.ReactNode)[]
}) {
  return (
    <UiContainerRounded>
      <Stack>
        <RigItemPanel rig={rig} actions={actions} h={'3rem'}/>
      </Stack>
    </UiContainerRounded>
  )
}