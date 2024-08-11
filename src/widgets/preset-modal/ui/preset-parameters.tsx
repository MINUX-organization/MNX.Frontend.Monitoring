import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";

import styles from './presetParameters.module.scss';

export function PresetParameters({
  gpuId
} : {
  gpuId?: string;
}) {
  return (
    <UiBorderBox>
      <UiBgContainer color="opaque">
        <div className={styles['preset-parameters']}>
          <span>Index: 
            <span>{gpuId}</span>
          </span>
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}