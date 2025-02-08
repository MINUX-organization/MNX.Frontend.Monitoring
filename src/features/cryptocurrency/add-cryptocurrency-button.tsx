import { PlusIcon } from "@/shared/assets/svg";
import { UiButton } from "@/shared/ui";

export function AddCryptocurrencyButton() {
  return (
    <UiButton colorPalette={'accept'}>
      Add <PlusIcon /> 
    </UiButton>
  );
}