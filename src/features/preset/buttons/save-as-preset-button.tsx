import { UiButton, UiDialog } from "@/shared/ui";
import { PresetForm, presetFormStore } from "../forms";
import { useState } from "react";

export function SaveAsPresetButton() {
  const { setMode, deviceName, setDeviceName, overclocking } = presetFormStore();
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
          defaultValues={{ name: '', deviceName }}
          onClose={() => setOpen(false)}
          deviceNameInputDisabled
          setDeviceName={setDeviceName}
          overclocking={overclocking}
        />
      )}
    />
  )
}