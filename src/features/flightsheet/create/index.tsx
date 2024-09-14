import { UiButton } from "@/shared/ui/ui-button";
import styles from './index.module.scss';

export default function CreateFlightSheetButton() {

  return (
    <UiButton color="blue" withBorder>
      <span className={styles['button-text']}>Create Flight Sheet</span>
    </UiButton>
  )
}