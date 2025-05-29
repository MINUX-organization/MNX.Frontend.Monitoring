import { DevicesIcons, UiContainerRounded, UiText } from "@/shared/ui";
import { FC } from "react";
import { MinerType } from "../model/miner.type";
import { Group } from "@chakra-ui/react";

export interface MinerItemPanelProps {
  item: MinerType,
}

export const MinerItemPanel: FC<MinerItemPanelProps> = ({ item }) => {
  return (
    <UiContainerRounded>
      <Group>
        <UiText>{item.name}</UiText>
        <UiText>{item.version}</UiText>
        <DevicesIcons devices={item.supportedDevices} />
      </Group>
    </UiContainerRounded>
  )
}