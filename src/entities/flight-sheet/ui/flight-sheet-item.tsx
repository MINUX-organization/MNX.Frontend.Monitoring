import { useState } from "react";
import { FlightSheetType } from "../model/flight-sheet.type"
import { Box, CollapsibleContent, CollapsibleRoot } from "@chakra-ui/react";
import { FlightSheetItemPanel } from "./flight-sheet-item-panel";
import { FLightSheetItemDropdown } from "./flight-sheet-item-dropdown";

export interface FlightSheetItemProps {
  flightSheet: FlightSheetType
  renderPanelActions?: ((id: string) => React.ReactNode)[]
  renderOpenDropDownButton?: (setOpen: () => void, open: boolean) => React.ReactNode
}

export function FlightSheetItem({ flightSheet, renderPanelActions, renderOpenDropDownButton }: FlightSheetItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <FlightSheetItemPanel 
        state={{ isOpen, setIsOpen }} 
        flightSheet={flightSheet} 
        renderActions={renderPanelActions}
        renderOpenButton={() => renderOpenDropDownButton?.(() => setIsOpen((prev) => !prev), isOpen)}
      />
      <CollapsibleRoot open={isOpen} position={'relative'} zIndex={1} shadow={'md'}>
        <CollapsibleContent>
          <FLightSheetItemDropdown flightSheet={flightSheet}/>
        </CollapsibleContent>
      </CollapsibleRoot>
    </Box>
  )
}