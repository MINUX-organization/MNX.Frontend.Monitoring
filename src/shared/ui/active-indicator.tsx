import { chakra } from "@chakra-ui/react"
import { BsCircleFill } from "react-icons/bs"

const CircleIcon = chakra(BsCircleFill)

export function ActiveIndicator({
  active
} : {
  active?: boolean
}) {
  return (
    <CircleIcon 
      color={active ? "green.500" : "red.500"} 
    />
  )
}