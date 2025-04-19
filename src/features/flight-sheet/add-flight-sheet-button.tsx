import { PlusIcon } from "@/shared/assets/svg";
import { UiButton } from "@/shared/ui";
import { Link, linkOptions } from "@tanstack/react-router";

export function AddFlightSheetButton() {
  const link = linkOptions({
    to: '/setup/flight-sheets/config',
  })

  return (
    <Link {...link}>
      <UiButton colorPalette={'accept'}>
        Add <PlusIcon />
      </UiButton>
    </Link>
  )
}