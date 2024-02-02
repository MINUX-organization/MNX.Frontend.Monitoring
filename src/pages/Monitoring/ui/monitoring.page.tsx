import { TotalPower } from "@/entities/power";
import { ElementSlot } from "../model/types";
import { GridLayout } from "./grid-layout";
import { TotalWorkers } from "@/entities/workers";

export function Monitoring() {
  const slots: ElementSlot[] = [
    {components: [<TotalPower/>, <TotalWorkers/>], slot: 'item-1'}
  ]
  return (
    <GridLayout slots={slots}/>
  )
}