import { flightSheetRepository } from "@/entities/flight-sheet";
import { FlightSheetForm, FlightSheetFormReset, FlightSheetFormSubmit } from "@/features/flight-sheet";
import { useFlightSheetFormStore } from "@/features/flight-sheet";
import { UiDialog } from "@/shared/ui";
import { Box, Group } from "@chakra-ui/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import startCase from "lodash/startCase";
import { useMemo } from "react";

const { useFlightSheetQuery } = flightSheetRepository;

export function FlightSheetModal() {
  const navigate = useNavigate();
  const { getById } = useFlightSheetQuery();
  const { id } = useSearch({ from: '/_guard-layout/_notification/setup/flight-sheets/config' });
  const { reset, formRef, clearUploadFiles, mode } = useFlightSheetFormStore();

  const flightSheet = useMemo(() => {
    return getById(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <UiDialog
      open
      size={'xl'}
      onOpenChange={() => navigate({ to: '..' })}
      renderTitle={() => `${startCase(mode)} Flight Sheet`}
      renderTrigger={() => <Box></Box>}
      renderBody={() => <FlightSheetForm flightSheet={flightSheet}/>}
      renderFooter={() => (
        <Group>
          <FlightSheetFormSubmit formRef={formRef} label={mode === 'add' ? 'Submit' : 'Save'}/>
          <FlightSheetFormReset
            label={mode === 'add' ? 'Reset' : 'Revert'}
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