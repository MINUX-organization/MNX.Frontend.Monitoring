import { flightSheetRepository } from "@/entities/flight-sheet";
import { UiButton } from "@/shared/ui";

const { useFlightSheetMutation } = flightSheetRepository;

export function FlightSheetSelectorApplyButton({
  flightSheetId,
  devicesIds
} : {
  flightSheetId: string
  devicesIds: string[]
}) {
  const { applyFlightSheetDevices } = useFlightSheetMutation();
  const handleClick = async () => {
    await applyFlightSheetDevices({id: flightSheetId, data: devicesIds});
  }

  return (
    <UiButton
      colorPalette={'accept'}
      onClick={handleClick}
    >
      Apply
    </UiButton>
  )
}