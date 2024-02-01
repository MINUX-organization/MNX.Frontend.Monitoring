import { ReactNode } from "react"

export type ElementSlot = {
  components: ReactNode[]
  slot: 'item-1' | 'item-2' | 'item-3'
}
