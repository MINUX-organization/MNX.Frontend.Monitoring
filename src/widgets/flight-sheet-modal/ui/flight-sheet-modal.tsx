import { FlightSheetForm, FlightSheetFormReset, FlightSheetFormSubmit } from "@/features/flight-sheet";
import { useFlightSheetFormStore } from "@/features/flight-sheet";
import { UiDialog } from "@/shared/ui";
import { Box, Group } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

export function FlightSheetModal() {
  const navigate = useNavigate();
  const { reset, formRef, clearUploadFiles } = useFlightSheetFormStore();

  return (
    <UiDialog
      open
      size={'xl'}
      onOpenChange={() => navigate({ to: '..' })}
      renderTitle={() => "Add Flight Sheet"}
      renderTrigger={() => <Box></Box>}
      renderBody={() => <FlightSheetForm />}
      renderFooter={() => (
        <Group>
          <FlightSheetFormSubmit formRef={formRef} />
          <FlightSheetFormReset 
            onClick={() => {
              reset?.();
              clearUploadFiles.forEach(clear => clear());
            }} 
          />
        </Group>
      )}
    />
  )
}