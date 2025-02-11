import { useProfileRepository } from "@/entities/profile";
import { UiButton } from "@/shared/ui/ui-button";

export function GenerateKey({
  className
} : {
  className?: string
}) {
  const { generateKey } = useProfileRepository();

  const handleClick = async () => {
    await generateKey();
  }

  return (
    <UiButton color="blue" onClick={handleClick} withBorder className={className}>
      Generate key
    </UiButton>
  )
}