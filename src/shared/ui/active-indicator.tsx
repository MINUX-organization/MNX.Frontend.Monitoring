import { chakra } from "@chakra-ui/react"
import { BsCircleFill } from "react-icons/bs"
import { match } from "ts-pattern"
import { CircleRoundedIcon } from "../assets/svg"
import { UiTooltip } from "./tooltip"

const CircleIcon = chakra(BsCircleFill)

export function ActiveIndicator({
  activeState,
  isOnline
} : {
  activeState?: 'Active' | 'Inactive' | 'Error'
  isOnline?: boolean
}) {
  const pattern = { static: isOnline, dynamic: activeState }

  return (
    <UiTooltip content={match(pattern)
      .with({ static: true, dynamic: 'Active' }, () => 'Online and mining')
      .with({ static: true, dynamic: 'Inactive' }, () => 'Online and not mining')
      .with({ static: true, dynamic: 'Error' }, () => 'Online and mining error')
      .with({ static: true, dynamic: undefined }, () => 'Online')
      .otherwise(() => 'Offline')
    }>
      {match(pattern)
        .with({ static: true, dynamic: 'Active' }, () => <CircleIcon color="green.500" />)
        .with({ static: true, dynamic: 'Inactive' }, () => <CircleRoundedIcon color="green.500" />)
        .with({ static: true, dynamic: 'Error' }, () => <CircleIcon color="red.500" />)
        .with({ static: true, dynamic: undefined }, () => <CircleRoundedIcon color="green.500" />)
        .otherwise(() => <CircleRoundedIcon color="gray.500" />)}
    </UiTooltip>
  )
}