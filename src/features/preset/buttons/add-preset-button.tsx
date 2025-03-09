import { PlusIcon } from "@/shared/assets/svg";
import { UiButton } from "@/shared/ui";
import { Link, linkOptions } from "@tanstack/react-router";

export function AddPresetButton() {
  const link = linkOptions({
    to: '/setup/presets/config',
  })

  return (
    <Link {...link}>
      <UiButton colorPalette={'accept'}>
        Add <PlusIcon />
      </UiButton>
    </Link>
  )
}