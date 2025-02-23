import { UiButton } from "@/shared/ui";

export function FlightSheetFormSubmit({ formRef, label }: { label?: string, formRef: React.RefObject<HTMLFormElement | null> | null }) {
  const handleExternalSubmit = () => {
    if (formRef && formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  return (
    <UiButton type="submit" colorPalette={'accept'} onClick={handleExternalSubmit}>
      {label ?? 'Submit'}
    </UiButton>
  )
}