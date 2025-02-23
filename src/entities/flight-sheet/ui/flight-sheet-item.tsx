import { useState } from "react";
import { FlightSheetType } from "../model/flight-sheet.type"
import { Box } from "@chakra-ui/react";
import { FlightSheetItemPanel } from "./flight-sheet-item-panel";

export interface FlightSheetItemProps {
  flightSheet: FlightSheetType
  renderPanelActions?: ((id: string) => React.ReactNode)[]
}

export function FlightSheetItem({ flightSheet, renderPanelActions }: FlightSheetItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <FlightSheetItemPanel state={{ isOpen, setIsOpen }} flightSheet={flightSheet} renderActions={renderPanelActions}/>
      
    </Box>
  )
}