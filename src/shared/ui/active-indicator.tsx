import { chakra } from "@chakra-ui/react"
import { BsCircleFill } from "react-icons/bs"
import { match } from "ts-pattern"
import { CircleRoundedIcon } from "../assets/svg"

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
    <>
      {match(pattern)
        .with({ static: true, dynamic: 'Active' }, () => <CircleIcon color="green.500" />)
        .with({ static: true, dynamic: 'Inactive' }, () => <CircleRoundedIcon color="green.500" />)
        .with({ static: true, dynamic: 'Error' }, () => <CircleIcon color="red.500" />)
        .with({ static: true, dynamic: undefined }, () => <CircleRoundedIcon color="green.500" />)
        .otherwise(() => <CircleRoundedIcon color="gray.500" />)}
    </>
  )
}