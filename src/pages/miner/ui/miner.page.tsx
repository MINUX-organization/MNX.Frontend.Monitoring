import { MinerType } from "@/entities/miner";
import { minerQueryOptions } from "@/entities/miner/model/miner.repository";
import { AddMinerButton, DeleteCustomMinerButton, EditCustomMinerButton } from "@/features/miners/buttons";
import { MinerForm } from "@/features/miners/forms";
import { DevicesIcons, UiButton, UiClipboard, UiText, UiToggleTip } from "@/shared/ui";
import { MiningTable } from "@/widgets/mining-table";
import { DataType } from "@/widgets/mining-table/model/column.type";
import { Group } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { FaEye } from "react-icons/fa";

export const MinerPage: FC = () => {
  const { data } = useSuspenseQuery(minerQueryOptions)

  const minersTable: DataType[] = []

  const minersMap = new Map<string, MinerType>(data.data.map((item) => {
    minersTable.push({
      id: item.id,
      name: item.name,
      version: item.version,
      supportedDevices: <DevicesIcons devices={item.supportedDevices} />,
      installationUrl: (
      <Group>
        <UiToggleTip content={<UiText>{item.installationUrl}</UiText>}>
          <UiButton variant="surface" size="sm">
            <FaEye />
          </UiButton>
        </UiToggleTip>
        <UiClipboard value={item.installationUrl} />
      </Group>
      ),
      miningMode: item.miningMode,
      custom: item.userId ? true : false
    })

    return [item.id, item]
  }))

  const actions = [
    (item: MinerType & { custom: boolean }) => 
      !item.custom && <EditCustomMinerButton renderMinerForm={(onClose) => 
        <MinerForm onClose={onClose} miner={minersMap.get(item.id)} mode="edit"/>}
      />,
    ({ id }: MinerType) => (
      <DeleteCustomMinerButton id={id}/>
    ),
  ]

  return (
    <MiningTable
      searchable
      sortable
      actions={actions}
      data={minersTable}
      renderAddButton={() => <AddMinerButton renderMinerForm={(onClose) => <MinerForm onClose={onClose}/>}/>}
    />
  )
}