import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { Preset } from "../model/types";
import styles from './styles/presetItem.module.scss';

export function PresetItem({
  className,
  preset
} : {
  className: string;
  preset: Preset;
}) {
  return (
    <UiBorderBox className={className}>
      <UiBgContainer className={styles["preset-item"]} color="transparent">
        <span>
          {preset.id}
          <span className={styles["gpu-name"]}>- {preset.name}</span>
        </span>
      </UiBgContainer>
    </UiBorderBox>
  )
}