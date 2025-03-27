import { chakra } from "@chakra-ui/react"
import { BsCircleFill } from "react-icons/bs"
import { match } from "ts-pattern"

const CircleIcon = chakra(BsCircleFill)

export function ActiveIndicator({
  activeState
} : {
  activeState?: 'Active' | 'Inactive' | 'Error' | undefined
}) {
  return (
    <CircleIcon
      color={match(activeState)
        .with('Active', () => 'green.500')
        .with('Inactive', () => 'gray.500')
        .with('Error', () => 'red.500')
        .otherwise(() => 'inherit')} 
    />
  )
}