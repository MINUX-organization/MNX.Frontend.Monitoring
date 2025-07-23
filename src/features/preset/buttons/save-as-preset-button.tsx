import { UiButton, UiDialog } from "@/shared/ui";
import { PresetForm, presetFormStore } from "../forms";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gpuUniqueNamesOptions } from "@/entities/devices";

export function SaveAsPresetButton() {
  const { setMode, deviceName, overclocking } = presetFormStore();
  const { data: deviceNames } = useQuery(gpuUniqueNamesOptions);
  const [open, setOpen] = useState(false);

  return (
    <UiDialog 
      open={open}
      onOpenChange={(open) => setOpen(open.open)}
      renderTrigger={() => (
        <UiButton colorPalette={'accept'} onClick={() => {
          setMode('add')
          setOpen(true)
        }}>
          Save as preset
        </UiButton>
      )}
      renderTitle={() => "Save as preset"}
      renderBody={() => (
        <PresetForm 
          devicesNames={deviceNames?.data}
          defaultValues={{ name: '', deviceName }}
          onClose={() => setOpen(false)}
          deviceNameInputDisabled
          overclocking={overclocking}
        />
      )}
    />
  )
}